import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/ // Just the ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

/**
 * Checks if a URL is a YouTube link
 */
function isYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null
}

export interface VideoPlayerProps {
  /** Video source URL */
  src: string
  /** Thumbnail/poster image to show before playing */
  poster?: string
  /** Additional class names for the container */
  className?: string
  /** Whether to show controls */
  controls?: boolean
  /** Whether to autoplay when rendered */
  autoPlay?: boolean
  /** Whether to loop the video */
  loop?: boolean
  /** Whether to mute the video */
  muted?: boolean
  /** Aspect ratio class, e.g., 'aspect-video', 'aspect-square' */
  aspectRatio?: string
  /** Callback when video ends */
  onEnded?: () => void
  /** Callback when video starts playing */
  onPlay?: () => void
  /** Callback when video is paused */
  onPause?: () => void
  /** Badge text to show on the thumbnail */
  badge?: string
  /** Custom play button size */
  playButtonSize?: 'sm' | 'md' | 'lg'
}

/**
 * A reusable video player component with a thumbnail overlay
 * that shows a play button and switches to the video when clicked.
 */
export function VideoPlayer({
  src,
  poster,
  className = '',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = true,
  aspectRatio = 'aspect-video',
  onEnded,
  onPlay,
  onPause,
  badge,
  playButtonSize = 'lg',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    onPlay?.()
    // Small delay to let the video element render
    setTimeout(() => {
      videoRef.current?.play()
    }, 100)
  }

  const handlePause = () => {
    videoRef.current?.pause()
    setIsPlaying(false)
    onPause?.()
  }

  const handleVideoEnded = () => {
    if (!loop) {
      setIsPlaying(false)
    }
    onEnded?.()
  }

  const handleVideoClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play()
    } else {
      videoRef.current?.pause()
    }
  }

  const playButtonSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  const playIconSizes = {
    sm: 20,
    md: 26,
    lg: 32,
  }

  // If no video source provided, just show the thumbnail
  if (!src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <div
          className={`${aspectRatio} w-full bg-cover bg-center relative`}
          style={{ backgroundImage: poster ? `url('${poster}')` : undefined }}
        >
          {/* Overlay indicating no video */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className={`${playButtonSizes[playButtonSize]} rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-50`}>
              <Play size={playIconSizes[playButtonSize]} className="text-white ml-1" />
            </div>
          </div>
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white font-mono border border-white/10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              {badge}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Check if this is a YouTube video
  const youtubeVideoId = extractYouTubeVideoId(src)
  const isYouTube = isYouTubeUrl(src)

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {isPlaying ? (
        // Video Player
        <div className={`${aspectRatio} w-full relative bg-black`}>
          {isYouTube && youtubeVideoId ? (
            // YouTube iframe player
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0${muted ? '&mute=1' : ''}${loop ? '&loop=1&playlist=' + youtubeVideoId : ''}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          ) : (
            // Native video player
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              className="w-full h-full object-contain"
              controls={controls}
              autoPlay
              loop={loop}
              muted={muted}
              onEnded={handleVideoEnded}
              onPlay={() => setShowControls(false)}
              onPause={() => setShowControls(true)}
              onClick={handleVideoClick}
            />
          )}
          {/* Custom pause overlay for touch devices - only for native video */}
          {showControls && !controls && !isYouTube && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={handlePause}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`${playButtonSizes[playButtonSize]} rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center`}
              >
                <Pause size={playIconSizes[playButtonSize]} className="text-white" />
              </motion.div>
            </motion.div>
          )}
        </div>
      ) : (
        // Thumbnail with Play Button
        <div
          className={`${aspectRatio} w-full bg-cover bg-center relative cursor-pointer group`}
          style={{ backgroundImage: poster ? `url('${poster}')` : undefined }}
          onClick={handlePlay}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
        >
          {/* Play button overlay */}
          <motion.div
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <motion.div
              className={`${playButtonSizes[playButtonSize]} rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Play size={playIconSizes[playButtonSize]} className="text-white ml-1" />
            </motion.div>
          </motion.div>

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-4 left-4 flex gap-2"
            >
              <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white font-mono border border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {badge}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Inline video player without thumbnail overlay.
 * Shows the video directly with optional controls.
 */
export interface InlineVideoPlayerProps {
  src: string
  poster?: string
  className?: string
  controls?: boolean
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  aspectRatio?: string
  onEnded?: () => void
}

export function InlineVideoPlayer({
  src,
  poster,
  className = '',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  aspectRatio = 'aspect-video',
  onEnded,
}: InlineVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black ${className}`}>
      <div className={`${aspectRatio} w-full`}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-contain"
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          onEnded={onEnded}
        />
      </div>
    </div>
  )
}

'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ThemeSwitcherProps {
  showLabel?: boolean
  className?: string
}

export function ThemeSwitcher({
  showLabel = false,
  className = '',
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={showLabel ? 'outline' : 'ghost'}
          size="sm"
          className={className}
        >
          {theme === 'light' ? (
            <Sun className={showLabel ? 'w-4 h-4 mr-2' : 'w-4 h-4'} />
          ) : (
            <Moon className={showLabel ? 'w-4 h-4 mr-2' : 'w-4 h-4'} />
          )}
          {showLabel ? t('header.theme.label') : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="w-4 h-4 mr-2" />
          {t('header.theme.light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="w-4 h-4 mr-2" />
          {t('header.theme.dark')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

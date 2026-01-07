/**
 * IFC Loader Service
 * Singleton service for loading and parsing IFC files using web-ifc
 */

import * as WebIFC from 'web-ifc'

// ============================================
// TYPES
// ============================================

export interface IFCPropertySet {
  name: string
  properties: Record<string, unknown>
}

export interface IFCElementInfo {
  expressID: number
  type: string
  name?: string
  description?: string
  propertySets: IFCPropertySet[]
}

// ============================================
// IFC LOADER SERVICE
// ============================================

class IFCLoaderService {
  private ifcApi: WebIFC.IfcAPI | null = null
  private isInitialized = false
  private initPromise: Promise<void> | null = null
  private loadedModels = new Map<string, number>() // url -> modelID

  /**
   * Initialize the IFC API with WASM
   */
  async init(): Promise<void> {
    if (this.isInitialized) return
    if (this.initPromise) return this.initPromise

    this.initPromise = (async () => {
      try {
        this.ifcApi = new WebIFC.IfcAPI()

        // Set WASM path - files copied to public/wasm/
        this.ifcApi.SetWasmPath('/wasm/', true)

        await this.ifcApi.Init()
        this.isInitialized = true
        console.log('[IFCLoader] Initialized successfully')
      } catch (error) {
        console.error('[IFCLoader] Failed to initialize:', error)
        this.initPromise = null
        throw error
      }
    })()

    return this.initPromise
  }

  /**
   * Load an IFC file from a URL
   */
  async loadFromUrl(url: string): Promise<number> {
    await this.init()

    if (!this.ifcApi) {
      throw new Error('IFC API not initialized')
    }

    // Check if already loaded
    const existingModelId = this.loadedModels.get(url)
    if (existingModelId !== undefined) {
      return existingModelId
    }

    try {
      console.log(`[IFCLoader] Loading IFC from: ${url}`)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch IFC file: ${response.statusText}`)
      }

      const buffer = await response.arrayBuffer()
      const data = new Uint8Array(buffer)

      const modelID = this.ifcApi.OpenModel(data)
      this.loadedModels.set(url, modelID)

      console.log(`[IFCLoader] Model loaded with ID: ${modelID}`)
      return modelID
    } catch (error) {
      console.error('[IFCLoader] Failed to load IFC:', error)
      throw error
    }
  }

  /**
   * Get all elements of a specific IFC type
   */
  getAllOfType(modelID: number, type: number): number[] {
    if (!this.ifcApi) return []

    try {
      const lines = this.ifcApi.GetLineIDsWithType(modelID, type)
      return Array.from(lines)
    } catch {
      return []
    }
  }

  /**
   * Get properties of an element
   */
  getElementProperties(modelID: number, expressID: number): IFCElementInfo | null {
    if (!this.ifcApi) return null

    try {
      const element = this.ifcApi.GetLine(modelID, expressID)

      const info: IFCElementInfo = {
        expressID,
        type: element.constructor.name,
        name: element.Name?.value,
        description: element.Description?.value,
        propertySets: [],
      }

      // Note: Getting property sets requires additional IFC processing
      // For now, we return basic element info
      // TODO: Implement property set extraction using GetLine with recursive flag

      return info
    } catch (error) {
      console.error('[IFCLoader] Failed to get properties:', error)
      return null
    }
  }

  /**
   * Get geometry data for rendering
   */
  getModelGeometry(modelID: number) {
    if (!this.ifcApi) return null

    try {
      return this.ifcApi.LoadAllGeometry(modelID)
    } catch (error) {
      console.error('[IFCLoader] Failed to load geometry:', error)
      return null
    }
  }

  /**
   * Close a model and free resources
   */
  closeModel(url: string): void {
    const modelID = this.loadedModels.get(url)
    if (modelID !== undefined && this.ifcApi) {
      try {
        this.ifcApi.CloseModel(modelID)
        this.loadedModels.delete(url)
        console.log(`[IFCLoader] Closed model: ${url}`)
      } catch (error) {
        console.error('[IFCLoader] Failed to close model:', error)
      }
    }
  }

  /**
   * Dispose of the loader and free all resources
   */
  dispose(): void {
    if (this.ifcApi) {
      for (const [url] of this.loadedModels) {
        this.closeModel(url)
      }
      this.ifcApi = null
      this.isInitialized = false
      this.initPromise = null
      console.log('[IFCLoader] Disposed')
    }
  }

  /**
   * Check if initialized
   */
  get ready(): boolean {
    return this.isInitialized
  }
}

// Export singleton instance
export const ifcLoader = new IFCLoaderService()

// Export class for testing
export { IFCLoaderService }

export interface PageAdaptor {
  isUrlSupported(url: string): boolean
  adaptPage(): void
  revertAdaptation(): void
}

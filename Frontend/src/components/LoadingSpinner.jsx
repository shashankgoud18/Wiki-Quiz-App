function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-blue-400 animate-spin" aria-label="Loading" />
    </div>
  )
}

export default LoadingSpinner

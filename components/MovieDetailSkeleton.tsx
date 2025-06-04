export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-10 w-32 bg-muted rounded mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 relative aspect-[2/3] min-h-[450px] rounded-lg bg-muted"></div>
          
          <div className="md:col-span-2">
            <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
            
            <div className="flex items-center mb-6">
              <div className="h-6 bg-muted rounded w-20 mr-4"></div>
              <div className="h-6 bg-muted rounded w-32"></div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-8 bg-muted rounded-full w-24"></div>
              ))}
            </div>
            
            <div className="mb-6">
              <div className="h-7 bg-muted rounded w-32 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
            
            <div className="mb-6">
              <div className="h-7 bg-muted rounded w-32 mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                  <div className="h-5 bg-muted rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
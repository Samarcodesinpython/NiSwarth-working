import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
          <div className="h-6 w-32 bg-muted animate-pulse rounded mx-auto mb-2" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto" />
        </CardHeader>
        <CardContent>
          <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded mx-auto" />
        </CardContent>
      </Card>
    </div>
  )
}

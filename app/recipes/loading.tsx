import { Skeleton } from "@ui/skeleton"

export default function Loading() {

  return (
    <div>
      <Skeleton className="h-12 w-full bg-gray-200" />
      <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly align-middle mt-4">
        <Skeleton className="aspect-square bg-gray-200" />
        <Skeleton className="aspect-square bg-gray-200" />
        <Skeleton className="aspect-square bg-gray-200" />
        <Skeleton className="aspect-square bg-gray-200" />
      </div>
    </div>
  )

}
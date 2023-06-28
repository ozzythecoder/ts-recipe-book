import { Skeleton } from "@ui/skeleton"

export default function Loading() {

  return (
    <div className="flex flex-col gap-[1.5]">
      <Skeleton className="mb-2 h-12 w-[40%] bg-gray-200" />
      <Skeleton className="mb-4 h-8 w-full max-w-sm bg-gray-200" />
      <Skeleton className="mb-4 h-8 w-full max-w-sm bg-gray-200" />
      <Skeleton className="mb-4 h-8 w-full max-w-sm bg-gray-200" />
      <Skeleton className="mb-4 h-8 w-full max-w-sm bg-gray-200" />
    </div>
  )

}
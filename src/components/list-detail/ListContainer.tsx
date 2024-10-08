import { useEffect, useRef } from 'react'

export function ListContainer({ children, onRef, ...rest }: any) {
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    onRef(scrollContainerRef)
  }, [scrollContainerRef])

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-full max-h-screen min-h-screen w-full flex-none overflow-y-auto border-r border-gray-150 bg-white lg:w-80 lg:bg-gray-50 xl:w-96 dark:border-gray-800 dark:bg-gray-900 lg:dark:bg-gray-900"
      {...rest}
    >
      {children}
    </div>
  )
}

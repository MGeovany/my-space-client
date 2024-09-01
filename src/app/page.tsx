import { Intro } from '@/components/home/intro'
import { ListDetailView } from '@/components/layouts'

export default function Home() {
  return <ListDetailView list={null} hasDetail detail={<Intro />} />
}

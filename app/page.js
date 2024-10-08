import prisma from '/lib/prisma'
import Link from "next/link";
import {mois} from '/lib/utils'
import { LikeModule } from "/assets/component/LikeModule";
import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";


export default async function Home() {

   const session = await getServerSession(authOptions)
   const videos = await prisma.video.findMany({
      include: {
         category: {select: {name: true}},
         likes: {select: {fromUser: {select: {email: true}}}},
         fromUser: {select: {email: true}}
      },
      orderBy: {
         createdAt: 'desc'
      }
   })


  return <main>
     <h1>Nouveautés</h1>

     <section className="videos">

     {videos && videos.map(v => {
        const videoId = v.url.split('=')[1]
        const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`

        return <article key={v.id} className={'video'}>

           <LikeModule
              video={v}
              session={session} />

           <Link
              href={v.url}
              target={'_blank'}
              className="thumbnail"
              style={{backgroundImage: `url(${thumbnailURL})`}}>
           </Link>

           <p>{v.category.name} - {v.createdAt.getDate()} {mois[v.createdAt.getMonth()-1]} {v.createdAt.getFullYear()}</p>

           <h2>{v.name}</h2>

        </article>
     })}

     </section>
      </main>
}

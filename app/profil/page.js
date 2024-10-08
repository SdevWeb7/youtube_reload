import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";
import { redirect } from "next/navigation";
import { EditVideo } from "./EditVideo";
import prisma from "/lib/prisma";

export default async function Profil () {
   const session = await getServerSession(authOptions)
   if (!session) {redirect('/')}

   const videos = await prisma.video.findMany({
      where: {
         fromUser: {email: session.user.email}
      }
   })


   return <main className={'profil'}>
      <h1>Gérer mes vidéos</h1>

      <section className="videos-profil">

         {videos.length > 0 ? videos.map(video => {
            return <article
                     key={video.id}
                     className={'video-profil'}>

               <EditVideo video={video} />
            </article>
         }) : <p>Vous n&apos;avez pas encore de vidéos, ajoutez en !</p>}

      </section>


   </main>
}
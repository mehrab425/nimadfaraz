import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {

  await requireRole(["ADMIN", "SUPER_ADMIN", "STAFF"]);


  const [
    users,
    appointments
  ] = await Promise.all([

    prisma.user.count(),

    prisma.appointment.findMany({
      orderBy:{
        createdAt:"desc"
      },
      take:10
    })

  ]);



  return (

<section className="
min-h-screen
bg-[#23212c]
text-white
px-6 py-20
">


<div className="
max-w-7xl mx-auto
space-y-8
">


{/* HEADER */}

<div className="
rounded-3xl
bg-black/30
border border-white/10
p-8
">

<h1 className="
text-3xl
font-bold
">

پنل مدیریت موسسه حقوقی نیماد فراز پارس

</h1>


<p className="
mt-3
text-gray-400
">

کنترل کامل سایت و کاربران

</p>


</div>





{/* STATS */}

<div className="
grid md:grid-cols-3 gap-5
">


<div className="
rounded-3xl
bg-black/30
border border-white/10
p-6
">

<p className="text-gray-400">
کاربران
</p>

<h2 className="
text-4xl
font-bold
mt-3
">

{users}

</h2>


</div>




<div className="
rounded-3xl
bg-black/30
border border-white/10
p-6
">


<p className="text-gray-400">
درخواست مشاوره
</p>


<h2 className="
text-4xl
font-bold
mt-3
">

{appointments.length}

</h2>


</div>





<div className="
rounded-3xl
bg-black/30
border border-white/10
p-6
">

<p className="text-gray-400">
وضعیت
</p>


<h2 className="
text-xl
font-bold
mt-3
text-green-400
">

Online

</h2>


</div>



</div>





{/* MENU */}

<div className="
grid md:grid-cols-2 lg:grid-cols-3 gap-5
">


{
[
"📝 مدیریت مقالات",
"⚖️ خدمات حقوقی",
"👨‍⚖️ مدیریت وکلا",
"👥 کاربران",
"📅 درخواست مشاوره",
"⚙️ تنظیمات سایت",
"🔍 SEO",
"🖼 فایل‌ها",
"📊 آمار بازدید"

].map(item=>(


<div
key={item}
className="
rounded-3xl
bg-black/30
border border-white/10
p-6
hover:border-white/30
cursor-pointer
">


<h3 className="
text-lg
font-bold
">

{item}

</h3>


<p className="
text-gray-400
text-sm
mt-3
">

مدیریت و کنترل

</p>


</div>


))

}


</div>






{/* APPOINTMENTS */}


<div className="
rounded-3xl
bg-black/30
border border-white/10
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

آخرین درخواست‌های مشاوره

</h2>



<div className="
space-y-4
">


{
appointments.map((item:any)=>(


<div
key={item.id}
className="
rounded-2xl
border border-white/10
p-5
">


<p className="font-bold">

{item.fullName}

</p>


<p className="
text-gray-400
text-sm
">

{item.phone}

</p>


<p className="
text-yellow-300
text-sm
mt-2
">

{item.status}

</p>


</div>


))

}



</div>



</div>






</div>


</section>


  );
}
export default function DuanLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   return (
     <section>
       <div>
         {children}
       </div>
     </section>
   );
 }
 
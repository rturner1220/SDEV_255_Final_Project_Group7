import Hero from "../components/Hero"
import Card from "../components/Card"

const Home = () => {

     const stats = [
    { label: "Courses", value: "24" },
    { label: "Teachers", value: "6" },
    { label: "Students", value: "120" },
  ];

  return (
    <>
      <Hero />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-12 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} title={s.label}>
            <div className="text-3xl font-bold">{s.value}</div>
            <p className="mt-1 text-sm text-slate-400">Sample data</p>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Home
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Image from "next/image"
import cloud from "./cloud.webp"
const features = [
  {
    name: 'Seamless System Integration:',
    description:
      'Our solution enables seamless integration of diverse industrial systems, such as SCADA (Supervisory Control and Data Acquisition), MES (Manufacturing Execution Systems), PLCs (Programmable Logic Controllers), and ERP (Enterprise Resource Planning) systems. By connecting these systems in a unified architecture, we enable real-time data exchange, process automation, and enhanced decision-making capabilities.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Data Synchronization and Analysis:',
    description:
      'Integration Industrie IT optimizes operational efficiency by automating workflows, reducing manual intervention, and minimizing data silos. Streamlined communication between industrial and IT systems eliminates redundancies, accelerates processes, and enhances overall productivity.',
    icon: LockClosedIcon,
  },
  {
    name: 'Enhanced Visibility and Control:',
    description:
      'Our solution provides real-time visibility into industrial operations, empowering stakeholders to monitor key performance indicators, identify bottlenecks, and make data-driven decisions. With centralized control and monitoring, businesses gain better control over their production processes, enabling swift response to changes and improved resource allocation.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Scalability and Future-Readiness:',
    description:
      'Our Integration Industrie IT solution is designed to scale alongside your business growth. Whether you operate a small manufacturing facility or a large industrial complex, our solution can adapt to your evolving needs, accommodating new machines, systems, and technologies seamlessly.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Compliance and Security:',
    description:
      ' We prioritize compliance and security in our Integration Industrie IT solution. By adhering to industry standards and best practices, we ensure the protection of sensitive data, intellectual property, and industrial processes. Our solution helps businesses meet regulatory requirements and maintain the integrity and confidentiality of their information.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Expert Consultation and Support:',
    description:
      'We offer expert consultation and support throughout the integration process. Our team of experienced professionals possesses deep knowledge in both industrial and IT domains, enabling us to provide tailored solutions, strategic guidance, and ongoing assistance to ensure a successful integration journey.',
    icon: FingerPrintIcon,
  },
]

const Section = () => {
  return (
    <div>
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Integration</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          Integration Industrie IT solution offers a comprehensive suite of features and benefits designed to streamline and synchronize industrial operations with IT infrastructure.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Integration</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Here are the key features and benefits of our Integration Industrie IT solution
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Integration Industrie IT solution offers a comprehensive suite of features and benefits designed to streamline and synchronize industrial operations with IT infrastructure
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Boost your productivity.
              <br />
              Start using our app today.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
            Integration Industrie IT solution enables seamless integration of industrial and IT systems, unlocking operational efficiencies, enhanced visibility, and improved decision-making capabilities.
            </p>
            
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <Image
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src={cloud}
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  
    </div>
  )
}

export default Section;

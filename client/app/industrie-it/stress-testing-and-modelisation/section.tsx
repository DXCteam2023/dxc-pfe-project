import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import testing from './testing.jpg'
const features = [
  {
    name: 'Comprehensive Stress Testing',
    description:
      'Our solution conducts rigorous stress testing to evaluate the performance limits and capabilities of your IT systems under heavy workloads, peak usage scenarios, and adverse conditions. By simulating real-world scenarios, we identify potential bottlenecks, vulnerabilities, and areas for improvement, enabling you to optimize system performance and enhance overall operational resilience.',
    icon: LockClosedIcon,
  },
  {
    name: 'Performance Optimization: ',
    description: 'Based on the results of stress testing, we provide actionable insights and recommendations to optimize the performance of your IT systems. We help you fine-tune configurations, optimize resource allocation, and implement performance-enhancing strategies to ensure smooth and efficient operations even during high-demand periods.',
    icon: LockClosedIcon,
  },
  {
    name: 'Scalability Assessment:',
    description: 'Our Stress Testing & Modeling solution assesses the scalability of your IT systems to accommodate future growth and increased operational demands. We model different growth scenarios, evaluate system response, and provide recommendations to scale your infrastructure, ensuring it can handle growing workloads and evolving business requirements..',
    icon:LockClosedIcon,
  },
  {
    name: 'Resilience and Fault Tolerance:',
    description: ' We evaluate the fault tolerance and resilience of your IT systems to identify potential single points of failure and weak links. By conducting thorough modeling and stress testing, we help you design and implement robust failover mechanisms, redundancy strategies, and disaster recovery plans to minimize downtime and ensure business continuity.',
    icon:LockClosedIcon,
  },
  {
    name: 'Resource Optimization: ',
    description: 'Our solution helps optimize resource allocation within your IT systems. By analyzing resource utilization patterns, we identify opportunities for consolidation, virtualization, and efficient resource allocation. This enables cost savings, improved energy efficiency, and better utilization of computing resources.',
    icon:LockClosedIcon,
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
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Stress Testing And Modelisation</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          comprehensive set of features and benefits designed to assess and optimize the performance, reliability, and scalability of IT systems within industrial environments.

          </p>
        </div>
      </div>
    </div>
  
   
    
    </div>
  )
}

export default Section;
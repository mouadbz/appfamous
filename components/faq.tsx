import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What makes a great iOS app design?",
    answer:
      "Great iOS app design follows Apple's Human Interface Guidelines, focuses on user experience, maintains consistency with iOS design patterns, and prioritizes accessibility. It should be intuitive, visually appealing, and performant.",
  },
  {
    question: "How do I stay updated with iOS design trends?",
    answer:
      "Follow Apple's design resources, attend WWDC sessions, study popular apps on the App Store, join design communities, and regularly read design blogs and case studies. Our blog also covers the latest trends and best practices.",
  },
  {
    question: "What tools do you recommend for iOS app design?",
    answer:
      "Popular tools include Figma for UI design, Sketch for Mac users, Adobe XD for prototyping, Principle for animations, and Xcode for development. Each tool has its strengths depending on your workflow and team needs.",
  },
  {
    question: "How important is following Apple's design guidelines?",
    answer:
      "Very important. Following Apple's Human Interface Guidelines ensures your app feels native to iOS users, improves usability, and increases chances of App Store approval. However, you can still be creative within these guidelines.",
  },
  {
    question: "Can I use your design examples in my projects?",
    answer:
      "Our articles and tutorials are meant for educational purposes. While you can learn from the concepts and techniques, please create original designs for your commercial projects and respect intellectual property rights.",
  },
  {
    question: "Do you offer design services or consultations?",
    answer:
      "Currently, we focus on providing educational content through our blog. However, you can contact us through our '' option to discuss potential collaborations or custom content needs.",
  },
]

export default function FAQ() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know about iOS app design</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg mb-4 px-6">
              <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

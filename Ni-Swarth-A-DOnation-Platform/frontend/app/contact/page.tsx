import { Card, CardContent } from "@/components/ui/card"
import ScrollToTop from "@/components/scroll-to-top"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "./contact-form"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Jigansa Satapathy",
    role: "Backend Developer",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Samar Jamal",
    role: "ML Integration",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Harshita Pokhariya",
    role: "Data Science and Backend Developer",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Kushagra Dobhal",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-8">
                Whether you have a question about our platform, need help with registration, or want to provide
                feedback, our team is here to help.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        123 NGO Street, Charity Lane
                        <br />
                        Helping City, HC 12345
                        <br />
                        India
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-1">
                        <a href="mailto:contact@ni-swarth.org" className="hover:text-primary">
                          contact@ni-swarth.org
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:support@ni-swarth.org" className="hover:text-primary">
                          support@ni-swarth.org
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-1">
                        <a href="tel:+919876543210" className="hover:text-primary">
                          +91 98765 43210
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="tel:+919876543211" className="hover:text-primary">
                          +91 98765 43211
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Working Hours</h3>
                      <p className="text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Find Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our office to learn more about our platform and how we're making a difference.
            </p>
          </div>

          <div className="h-[400px] bg-gray-200 rounded-xl overflow-hidden">
            {/* Placeholder for Google Maps */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-6">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Map Placeholder</h3>
                <p className="text-gray-500">
                  In a real implementation, this would be an embedded Google Map showing our location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Meet the Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team is working hard to connect donors, volunteers, and NGOs to create meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover-lift overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </>
  )
}

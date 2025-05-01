import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-primary text-white dark:bg-primary/90">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Ni-Swarth</h3>
            <p className="mb-4 text-white/80 dark:text-white/90">
              A platform for change, a community for growth. Empowering communities with smarter donations to create
              meaningful impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/donor" className="text-white/80 hover:text-accent transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-white/80 hover:text-accent transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/ngo" className="text-white/80 hover:text-accent transition-colors">
                  NGO Registration
                </Link>
              </li>
              <li>
                <Link href="/find-ngos" className="text-white/80 hover:text-accent transition-colors">
                  Find NGOs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/80 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-accent shrink-0" />
                <span className="text-white/80">123 NGO Street, Charity Lane, Helping City</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-accent" />
                <span className="text-white/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-accent" />
                <span className="text-white/80">contact@ni-swarth.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60">
          <p>© {new Date().getFullYear()} Ni-Swarth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

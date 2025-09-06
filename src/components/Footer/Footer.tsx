import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { UserData, SocialLink } from '../../types'; // Adjusted import path

/**
 * Props for the Footer component.
 */
type FooterProps = {
  /** User data object containing information like full name and social links. */
  userData: UserData;
};

const iconMap: { [key: string]: React.ElementType } = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail, // Assuming Email is a suitable mapping for an email link icon
};

/**
 * FooterComponent displays copyright information and social media links.
 * It is designed to be placed at the bottom of the application.
 *
 * @param {FooterProps} props - The properties passed to the component.
 * @param {UserData} props.userData - The user data to display in the footer.
 * @returns {React.ReactElement} The rendered footer element.
 */
const defaultUserData: UserData = {
  fullName: 'User',
  bioLine: '',
  photoUrl: '',
  email: 'user@example.com',
  phone: '',
  location: '',
  socialLinks: [],
  resumeUrl: '',
};

const FooterComponent = ({ userData = defaultUserData }: FooterProps): React.ReactElement => {
  const currentYear = new Date().getFullYear();

  // Prepare social links to include email explicitly if not in socialLinks array
  const displaySocialLinks: SocialLink[] = [
    ...userData.socialLinks.filter((link) => iconMap[link.name]),
  ];
  const emailLink: SocialLink = { name: 'Email', url: `mailto:${userData.email}` };

  return (
    <footer
      id="end"
      className="bg-transparent py-8 text-text-secondary" // Make footer transparent
    >
      <div className="container mx-auto w-full px-6">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex items-center space-x-6">
            {displaySocialLinks.map((link) => {
              const IconComponent = iconMap[link.name];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-text-secondary transition-colors duration-300 hover:text-accent"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="h-6 w-6" />
                </motion.a>
              );
            })}
            <motion.a
              href={emailLink.url}
              aria-label={emailLink.name}
              className="text-text-secondary transition-colors duration-300 hover:text-accent"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-6 w-6" />
            </motion.a>
          </div>
          <div className="mt-4 w-full border-t border-white/10 pt-4">
            <p className="text-center text-sm text-text-secondary">
              © {currentYear} {userData.fullName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Memoized Footer component.
 * @see FooterComponent
 */
export const Footer = React.memo(FooterComponent);

import type { SliderSlidesProps } from '@general/components';

export const sliderSamples: SliderSlidesProps = [
  {
    left: {
      image: {
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        alt: 'Project image 1',
      },
    },
    right: {
      title: 'Project One',
      description:
        'A beautiful portfolio project built with React and modern web technologies. This slide demonstrates the layout and styling of the component.',
      list: ['React 19', 'TypeScript', 'Tailwind CSS'],
      link: { url: '#', copy: 'View Project' },
      company: 'Velir',
      tags: ['demo', 'poc'],
    },
  },
  {
    left: {
      image: {
        src: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop',
        alt: 'Project image 2',
      },
    },
    right: {
      title: 'Project Two',
      description:
        'Another exemplary project showcasing the versatility and responsiveness of the Slider component across different screen sizes and interaction modes.',
      list: ['Vite', 'TanStack Router', 'Container Queries'],
      link: { url: '#', copy: 'Explore' },
      company: 'Velir',
      tags: ['demo', 'poc'],
    },
  },
];

export const sliderFeatured: SliderSlidesProps = [
  {
    left: {
      image: {
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        alt: 'Project showcase image 1',
      },
    },
    right: {
      title: 'Project Alpha',
      description:
        'An innovative web application built with cutting-edge technologies. This project showcases responsive design, accessibility best practices, and smooth interactions across all devices.',
      list: [
        'React 19',
        'TypeScript',
        'Tailwind CSS 4',
        'TanStack Router',
        'Container Queries',
      ],
      link: { url: '#', copy: 'View Project' },
      company: 'HMC Ad',
      tags: ['charity', 'poc'],
    },
  },
  {
    left: {
      image: {
        src: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop',
        alt: 'Project showcase image 2',
      },
    },
    right: {
      title: 'Project Beta',
      description:
        'A full-stack solution demonstrating modern web development practices. Features include real-time updates, advanced state management, and a polished user interface designed with attention to detail.',
      list: ['Vite', 'shadcn/ui', 'Radix UI', 'CVA', 'Phosphor Icons'],
      link: { url: '#', copy: 'Explore' },
      company: 'HMC Ad',
      tags: ['charity', 'poc'],
    },
  },
  {
    left: {
      image: {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        alt: 'Project showcase image 3',
      },
    },
    right: {
      title: 'Project Gamma',
      description:
        'A comprehensive portfolio application showcasing design systems and component architecture. Built to fill its container while maintaining beautiful aesthetics across all screen sizes and interaction modes.',
      list: [
        'Web Components',
        'Accessible',
        'Mobile-first',
        'Dark Mode Support',
        'Performance Optimized',
      ],
      link: { url: '#', copy: 'Learn More' },
      company: 'HMC Ad',
      tags: ['charity', 'poc'],
    },
  },
];

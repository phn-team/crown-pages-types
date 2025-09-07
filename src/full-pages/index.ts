/**
 * Crown Pages Full Pages System
 * 
 * Full Pages are complete, professionally designed page experiences that users cannot 
 * rearrange but can customize content within. Unlike regular sections that users build 
 * piece by piece, Full Pages provide optimized, cohesive layouts with fixed structure.
 * 
 * Key Differences from Regular Sections:
 * 1. Non-rearrangeable: Layout order is fixed for optimal UX
 * 2. Cohesive Design: All components designed to work together
 * 3. Specialized Layouts: Advanced responsive behaviors not possible with individual sections
 * 4. Content-only Editing: Users edit content, not structure
 */

import { FieldDefinition, StyleOptions, RenderingHints } from '../sections';

// Full Page Field Types - similar to sections but optimized for full page layouts
export interface FullPageSection {
  /** Unique identifier for this section within the full page */
  id: string;
  /** Type of section (hero, about, contact, etc) */
  type: string;
  /** Display name for the section */
  name: string;
  /** Field definitions for content editing */
  fields: Record<string, FieldDefinition>;
  /** Default data for this section */
  defaultData: Record<string, any>;
  /** Whether this section can be disabled/hidden */
  optional: boolean;
  /** Custom CSS classes or layout hints for this section */
  layoutHints?: {
    /** CSS classes to apply */
    cssClasses?: string[];
    /** Custom spacing or layout properties */
    spacing?: 'none' | 'small' | 'medium' | 'large';
    /** Background treatment */
    background?: 'none' | 'gray' | 'white' | 'primary' | 'gradient';
  };
}

// Full Page Definition
export interface FullPageDefinition {
  /** Unique identifier for this full page type */
  type: string;
  /** Display name */
  name: string;
  /** Description of what this full page is for */
  description: string;
  /** Category for organization */
  category: 'business' | 'personal' | 'healthcare' | 'restaurant' | 'service' | 'creative' | 'nonprofit';
  /** Icon configuration for mobile and web */
  icon: {
    mobile: string; // Ionicons name
    web: string;    // Lucide icon name  
  };
  /** Preview image URL or component */
  preview?: {
    image?: string;
    thumbnail?: string;
  };
  
  /** The sections that make up this full page (in order) */
  sections: FullPageSection[];
  
  /** Global style options that apply to the entire page */
  globalStyles: StyleOptions & {
    /** Primary theme colors that can be customized */
    themeColors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    /** Typography settings */
    typography: {
      headingFont: string;
      bodyFont: string;
    };
  };
  
  /** Platform-specific rendering hints */
  renderingHints: RenderingHints & {
    /** Full page specific hints */
    fullPage: {
      /** Whether to show a table of contents/navigation */
      showNavigation?: boolean;
      /** Scroll behavior */
      scrollBehavior?: 'smooth' | 'instant';
      /** Page transitions */
      transitions?: boolean;
      /** Advanced responsive behavior */
      responsiveBreakpoints?: {
        mobile: number;
        tablet: number;
        desktop: number;
      };
    };
  };
  
  /** Version for compatibility */
  version: string;
  
  /** SEO and metadata configuration */
  seo?: {
    /** Default meta description template */
    metaDescription?: string;
    /** Structured data type */
    structuredDataType?: 'Organization' | 'Person' | 'LocalBusiness' | 'HealthcareOrganization';
    /** Open Graph configuration */
    openGraph?: {
      type?: string;
      imageRequirements?: {
        width: number;
        height: number;
        format: string[];
      };
    };
  };
}

// Base implementations for common full page sections
export const COMMON_FULLPAGE_SECTIONS = {
  hero: {
    id: 'hero',
    type: 'hero',
    name: 'Hero Section',
    fields: {
      title: {
        type: 'text',
        required: true,
        label: 'Main Title',
        placeholder: 'Your Business Name',
        maxLength: 100
      },
      subtitle: {
        type: 'text', 
        required: false,
        label: 'Subtitle',
        placeholder: 'What you do or your tagline',
        maxLength: 200
      },
      backgroundImage: {
        type: 'image',
        required: false,
        label: 'Hero Background Image',
        accept: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 5
      },
      logo: {
        type: 'image',
        required: false,
        label: 'Business Logo',
        accept: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
        maxSize: 2
      }
    },
    defaultData: {
      title: '',
      subtitle: '',
      backgroundImage: null,
      logo: null
    },
    optional: false,
    layoutHints: {
      spacing: 'none',
      background: 'none',
      cssClasses: ['hero-fullpage']
    }
  } as FullPageSection,

  about: {
    id: 'about',
    type: 'about',
    name: 'About Section',
    fields: {
      title: {
        type: 'text',
        required: false,
        label: 'Section Title',
        placeholder: 'About Us',
        maxLength: 80
      },
      content: {
        type: 'textarea',
        required: true,
        label: 'About Content',
        placeholder: 'Tell your story...',
        maxLength: 1000,
        rows: 6
      },
      image: {
        type: 'image',
        required: false,
        label: 'About Image',
        accept: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 3
      }
    },
    defaultData: {
      title: 'About Us',
      content: '',
      image: null
    },
    optional: false,
    layoutHints: {
      spacing: 'large',
      background: 'white',
      cssClasses: ['about-fullpage']
    }
  } as FullPageSection,

  contact: {
    id: 'contact',
    type: 'contact',
    name: 'Contact Information',
    fields: {
      title: {
        type: 'text',
        required: false,
        label: 'Section Title',
        placeholder: 'Contact Us',
        maxLength: 80
      },
      phone: {
        type: 'text',
        required: false,
        label: 'Phone Number',
        placeholder: '(555) 123-4567'
      },
      email: {
        type: 'text',
        required: false,
        label: 'Email Address',
        placeholder: 'hello@business.com'
      },
      fax: {
        type: 'text',
        required: false,
        label: 'Fax Number',
        placeholder: '(555) 123-4568'
      },
      address: {
        type: 'textarea',
        required: false,
        label: 'Address',
        placeholder: '123 Main St\nCity, State 12345',
        rows: 3
      },
      website: {
        type: 'text',
        required: false,
        label: 'Website',
        placeholder: 'https://www.business.com'
      },
      hours: {
        type: 'textarea',
        required: false,
        label: 'Business Hours',
        placeholder: 'Mon-Fri: 9AM-6PM\nSat: 10AM-4PM\nSun: Closed',
        rows: 4
      }
    },
    defaultData: {
      title: 'Contact Us',
      phone: '',
      email: '',
      fax: '',
      address: '',
      website: '',
      hours: ''
    },
    optional: false,
    layoutHints: {
      spacing: 'large',
      background: 'gray',
      cssClasses: ['contact-fullpage']
    }
  } as FullPageSection,

  gallery: {
    id: 'gallery',
    type: 'gallery',
    name: 'Media Gallery',
    fields: {
      title: {
        type: 'text',
        required: false,
        label: 'Gallery Title',
        placeholder: 'Our Work',
        maxLength: 80
      },
      images: {
        type: 'array',
        required: false,
        label: 'Images',
        maxItems: 20,
        itemSchema: {
          url: {
            type: 'image',
            required: true,
            label: 'Image',
            accept: ['jpg', 'jpeg', 'png', 'webp'],
            maxSize: 5
          },
          caption: {
            type: 'text',
            required: false,
            label: 'Caption',
            maxLength: 100
          }
        }
      }
    },
    defaultData: {
      title: 'Gallery',
      images: []
    },
    optional: true,
    layoutHints: {
      spacing: 'large',
      background: 'white',
      cssClasses: ['gallery-fullpage']
    }
  } as FullPageSection
};

// Healthcare Provider Full Page - Exact replica of PHN Provider page
export const HEALTHCARE_PROVIDER_FULLPAGE: FullPageDefinition = {
  type: 'healthcare-provider',
  name: 'Healthcare Provider',
  description: 'Complete professional healthcare provider page - exactly like PHN providers',
  category: 'healthcare',
  icon: {
    mobile: 'medical-outline',
    web: 'stethoscope'
  },
  preview: {
    thumbnail: '/templates/healthcare-provider-thumb.png'
  },
  
  sections: [
    // Hero section - matches PHN hero with facility name, image, and logo
    {
      id: 'hero',
      type: 'hero',
      name: 'Facility Header',
      fields: {
        facilityName: {
          type: 'text',
          required: true,
          label: 'Facility Name',
          placeholder: 'Your Healthcare Facility',
          maxLength: 200
        },
        heroImage: {
          type: 'image',
          required: false,
          label: 'Hero Background Image',
          accept: ['jpg', 'jpeg', 'png', 'webp'],
          maxSize: 5
        },
        logo: {
          type: 'image',
          required: false,
          label: 'Facility Logo',
          accept: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
          maxSize: 2
        }
      },
      defaultData: {
        facilityName: '',
        heroImage: null,
        logo: null
      },
      optional: false
    },
    
    // Facility Details - address, phone, fax, certification
    {
      id: 'facilityDetails',
      type: 'facilityDetails',
      name: 'Facility Information',
      fields: {
        streetAddress: {
          type: 'text',
          required: false,
          label: 'Street Address',
          placeholder: '123 Main Street',
          maxLength: 200
        },
        unit: {
          type: 'text',
          required: false,
          label: 'Unit/Suite',
          placeholder: 'Suite 100',
          maxLength: 50
        },
        city: {
          type: 'text',
          required: false,
          label: 'City',
          placeholder: 'Your City',
          maxLength: 100
        },
        state: {
          type: 'text',
          required: false,
          label: 'State',
          placeholder: 'State',
          maxLength: 50
        },
        zipCode: {
          type: 'text',
          required: false,
          label: 'ZIP Code',
          placeholder: '12345',
          maxLength: 10
        },
        phone: {
          type: 'text',
          required: false,
          label: 'Main Phone Number',
          placeholder: '(555) 123-4567'
        },
        fax: {
          type: 'text',
          required: false,
          label: 'Fax Number',
          placeholder: '(555) 123-4568'
        },
        website: {
          type: 'text',
          required: false,
          label: 'Website',
          placeholder: 'https://www.yourfacility.com'
        },
        ualaCertified: {
          type: 'boolean',
          required: false,
          label: 'UALA Certified'
        }
      },
      defaultData: {
        streetAddress: '',
        unit: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        fax: '',
        website: '',
        ualaCertified: false
      },
      optional: false
    },
    
    // About section - service description
    {
      id: 'about',
      type: 'about',
      name: 'About Section',
      fields: {
        serviceDescription: {
          type: 'textarea',
          required: false,
          label: 'Service Description',
          placeholder: 'Describe your services and what makes your facility special...',
          maxLength: 1000,
          rows: 6
        }
      },
      defaultData: {
        serviceDescription: ''
      },
      optional: true
    },
    
    // Pricing section - matches PHN pricing display
    {
      id: 'pricing',
      type: 'pricing',
      name: 'Pricing Information',
      fields: {
        priceLow: {
          type: 'text',
          required: false,
          label: 'Starting Price (monthly)',
          placeholder: '3500'
        },
        priceHigh: {
          type: 'text',
          required: false,
          label: 'Max Price (monthly)',
          placeholder: '6000'
        }
      },
      defaultData: {
        priceLow: '',
        priceHigh: ''
      },
      optional: true
    },
    
    // Services section - checkboxes for different service types
    {
      id: 'services',
      type: 'services',
      name: 'Services Offered',
      fields: {
        hasAssistedLiving: {
          type: 'boolean',
          required: false,
          label: 'Assisted Living'
        },
        hasMemoryCare: {
          type: 'boolean',
          required: false,
          label: 'Memory Care'
        },
        hasIndependentLiving: {
          type: 'boolean',
          required: false,
          label: 'Independent Living'
        },
        hasSkilledNursing: {
          type: 'boolean',
          required: false,
          label: 'Skilled Nursing'
        },
        hasInHomeCare: {
          type: 'boolean',
          required: false,
          label: 'In-Home Care'
        },
        hasHomeHealth: {
          type: 'boolean',
          required: false,
          label: 'Home Health'
        },
        hasHospice: {
          type: 'boolean',
          required: false,
          label: 'Hospice'
        },
        hasDme: {
          type: 'boolean',
          required: false,
          label: 'DME (Durable Medical Equipment)'
        },
        hasTransportation: {
          type: 'boolean',
          required: false,
          label: 'Transportation'
        }
      },
      defaultData: {
        hasAssistedLiving: false,
        hasMemoryCare: false,
        hasIndependentLiving: false,
        hasSkilledNursing: false,
        hasInHomeCare: false,
        hasHomeHealth: false,
        hasHospice: false,
        hasDme: false,
        hasTransportation: false
      },
      optional: true
    },
    
    // Insurance section - list of accepted insurance
    {
      id: 'insurance',
      type: 'insurance',
      name: 'Accepted Insurance',
      fields: {
        insuranceList: {
          type: 'array',
          required: false,
          label: 'Insurance Plans',
          maxItems: 20,
          itemSchema: {
            name: {
              type: 'text',
              required: true,
              label: 'Insurance Name',
              placeholder: 'Blue Cross Blue Shield',
              maxLength: 100
            }
          }
        }
      },
      defaultData: {
        insuranceList: []
      },
      optional: true
    },
    
    // Admission coordinator section
    {
      id: 'admissionCoordinator',
      type: 'admissionCoordinator',
      name: 'Admission Coordinator',
      fields: {
        name: {
          type: 'text',
          required: false,
          label: 'Coordinator Name',
          placeholder: 'Jane Smith',
          maxLength: 100
        },
        phone: {
          type: 'text',
          required: false,
          label: 'Direct Phone',
          placeholder: '(555) 123-4567'
        },
        email: {
          type: 'text',
          required: false,
          label: 'Email',
          placeholder: 'jane.smith@facility.com'
        }
      },
      defaultData: {
        name: '',
        phone: '',
        email: ''
      },
      optional: true
    },
    
    // Media gallery section - reuse existing gallery implementation
    {
      id: 'gallery',
      type: 'gallery',
      name: 'Photo Gallery',
      fields: {
        // Use existing gallery implementation from the app
        galleryEnabled: {
          type: 'boolean',
          required: false,
          label: 'Enable Photo Gallery'
        }
      },
      defaultData: {
        galleryEnabled: true
      },
      optional: true,
      layoutHints: {
        spacing: 'large',
        background: 'white',
        cssClasses: ['gallery-fullpage']
      }
    }
  ],
  
  globalStyles: {
    canOverride: ['colors', 'typography'],
    colorFields: ['primary', 'secondary', 'background', 'text'],
    themeColors: {
      primary: '#2563EB', // Medical blue
      secondary: '#1E40AF',
      accent: '#059669' // Medical green
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter'
    }
  },
  
  renderingHints: {
    mobile: {
      height: 'auto',
      spacing: 'normal',
      layout: 'single',
      specialFeatures: {
        addToContacts: true,
        quickActions: true,
        shareCard: true
      }
    },
    web: {
      height: 'auto',
      responsive: true,
      container: 'contained',
      animation: true,
      specialFeatures: {
        hoverEffects: true,
        socialPreview: true,
        printOptimized: true,
        copyToClipboard: true
      }
    },
    fullPage: {
      showNavigation: true,
      scrollBehavior: 'smooth',
      transitions: true,
      responsiveBreakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280
      }
    }
  },
  
  version: '1.0.0',
  
  seo: {
    metaDescription: 'Professional healthcare provider serving the community with quality medical care and comprehensive services.',
    structuredDataType: 'HealthcareOrganization',
    openGraph: {
      type: 'website',
      imageRequirements: {
        width: 1200,
        height: 630,
        format: ['jpg', 'png', 'webp']
      }
    }
  }
};

// Full Pages registry
export const FULLPAGE_DEFINITIONS: Record<string, FullPageDefinition> = {
  'healthcare-provider': HEALTHCARE_PROVIDER_FULLPAGE
};

// Helper functions
export const getFullPageDefinition = (type: string): FullPageDefinition | null => {
  return FULLPAGE_DEFINITIONS[type] || null;
};

export const getAllFullPageTypes = (): string[] => {
  return Object.keys(FULLPAGE_DEFINITIONS);
};

export const getFullPagesByCategory = (category: string): FullPageDefinition[] => {
  return Object.values(FULLPAGE_DEFINITIONS).filter(def => def.category === category);
};

export const validateFullPageData = (fullPageType: string, data: any): { valid: boolean; errors: string[] } => {
  const definition = getFullPageDefinition(fullPageType);
  if (!definition) {
    return { valid: false, errors: [`Unknown full page type: ${fullPageType}`] };
  }

  const errors: string[] = [];

  // Validate each section's data
  definition.sections.forEach(section => {
    const sectionData = data[section.id] || {};
    
    Object.entries(section.fields).forEach(([fieldName, fieldDef]) => {
      if (fieldDef.required && (!sectionData[fieldName] || sectionData[fieldName] === '')) {
        errors.push(`${section.name}: ${fieldDef.label} is required`);
      }

      // Validate text length
      if (fieldDef.type === 'text' && sectionData[fieldName]) {
        const textField = fieldDef as any;
        if (textField.maxLength && sectionData[fieldName].length > textField.maxLength) {
          errors.push(`${section.name}: ${fieldDef.label} must be ${textField.maxLength} characters or less`);
        }
      }
    });
  });

  return { valid: errors.length === 0, errors };
};

// Version compatibility
export const FULLPAGE_SCHEMA_VERSION = '1.0.0';
export const isCompatibleFullPageVersion = (version: string): boolean => {
  return version === FULLPAGE_SCHEMA_VERSION;
};

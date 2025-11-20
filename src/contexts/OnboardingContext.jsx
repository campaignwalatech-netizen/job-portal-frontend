import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    // Personal Information
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      gender: ''
    },
    // Professional Information
    professionalInfo: {
      currentTitle: '',
      totalExperience: '',
      currentCompany: '',
      currentSalary: '',
      expectedSalary: '',
      noticePeriod: ''
    },
    // Education
    education: [],
    // Work Experience
    experience: [],
    // Skills
    skills: [],
    // Resume
    resume: null,
    // Profile Photo
    profilePhoto: null,
    // Job Preferences
    jobPreferences: {
      preferredLocations: [],
      jobTypes: [],
      industries: [],
      preferredRoles: []
    }
  });

  const updateOnboardingData = (section, data) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const addEducation = (education) => {
    setOnboardingData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  const removeEducation = (index) => {
    setOnboardingData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = (experience) => {
    setOnboardingData(prev => ({
      ...prev,
      experience: [...prev.experience, experience]
    }));
  };

  const removeExperience = (index) => {
    setOnboardingData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill) => {
    setOnboardingData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const removeSkill = (index) => {
    setOnboardingData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const setResume = (resumeFile) => {
    setOnboardingData(prev => ({
      ...prev,
      resume: resumeFile
    }));
  };

  const setProfilePhoto = (photoFile) => {
    setOnboardingData(prev => ({
      ...prev,
      profilePhoto: photoFile
    }));
  };

  const value = {
    onboardingData,
    updateOnboardingData,
    addEducation,
    removeEducation,
    addExperience,
    removeExperience,
    addSkill,
    removeSkill,
    setResume,
    setProfilePhoto
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
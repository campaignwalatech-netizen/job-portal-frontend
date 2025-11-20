import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      gender: ''
    },
    professionalInfo: {
      currentTitle: '',
      totalExperience: '',
      currentCompany: '',
      currentSalary: '',
      expectedSalary: '',
      noticePeriod: ''
    },
    education: [],
    experience: [],
    skills: [],
    resume: null,
    profilePhoto: null,
  });

  const updateOnboardingData = (section, data) => {
    console.log('Updating:', section, data);
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const addEducation = (education) => {
    console.log('Adding education:', education);
    setOnboardingData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  const removeEducation = (index) => {
    console.log('Removing education at index:', index);
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
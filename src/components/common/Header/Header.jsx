import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EmployeeLoginModal from "../../Employee/EmployeeLoginModal";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  
  const navigate = useNavigate();
  const jobsDropdownRef = useRef(null);
  const careerDropdownRef = useRef(null);
  
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobsDropdownRef.current && !jobsDropdownRef.current.contains(event.target)) {
        setJobsDropdownOpen(false);
      }
      if (careerDropdownRef.current && !careerDropdownRef.current.contains(event.target)) {
        setCareerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const mobileMenuItems = [
    { label: 'Find Jobs', onClick: () => setIsMobileMenuOpen(false) },
    { label: 'Career Compass', onClick: () => setIsMobileMenuOpen(false) },
    { label: 'Blog', onClick: () => setIsMobileMenuOpen(false) },
    { label: 'Contact Us', onClick: () => setIsMobileMenuOpen(false) },
  ];

  const jobCategories = [
    "Work From Home Jobs",
    "Part Time Jobs",
    "Freshers Jobs",
    "Jobs for women",
    "Full Time Jobs",
    "Night Shift Jobs",
    "International Jobs"
  ];

  const jobFilters = [
    "Jobs By City",
    "Jobs By Department",
    "Jobs By Company",
    "Jobs By Qualification",
    "Others"
  ];

  const careerFeatures = [
    {
      title: "AI Resume Builder",
      description: "Create your best resume with AI"
    },
    {
      title: "AI Resume Checker",
      description: "Get instant resume feedback"
    },
    {
      title: "AI Cover Letter Generator",
      description: "Stand out and get hired"
    },
    {
      title: "AI Interview (Coming soon)",
      description: "Your strategy to success"
    },
    {
      title: "Your Strategy to Success Blog",
      description: "Guidance for securing dream job"
    }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: '#ffffff',
      color: '#0b2236',
      boxShadow: 'none',
      zIndex: 2000,
      borderBottom: '1px solid #f3f4f6'
    }}>
      {/* Desktop Navigation */}
      <div style={{ display: isMobile ? 'none' : 'block' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          paddingLeft: 'calc(4vw + 20px)',
          paddingRight: 'calc(4vw + 20px)',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          {/* Left Section - Logo & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img
                src="/logo.png"
                alt="logo"
                style={{ width: 70, height: 'auto', display: 'block', borderRadius: '8px' }}
              />
            </Link>

            {/* Desktop Menu Items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {/* Find Jobs Dropdown */}
              <div style={{ position: 'relative' }} ref={jobsDropdownRef}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#0b2236',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 0',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={() => {
                    setJobsDropdownOpen(true);
                    setCareerDropdownOpen(false);
                  }}
                  onClick={() => {
                    setJobsDropdownOpen(!jobsDropdownOpen);
                    setCareerDropdownOpen(false);
                  }}
                >
                  Find Jobs
                  <KeyboardArrowDownIcon style={{ width: '16px', height: '16px' }} />
                </button>
                
                {jobsDropdownOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '100%',
                      marginTop: '8px',
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      zIndex: 50,
                      width: '700px'
                    }}
                    onMouseEnter={() => setJobsDropdownOpen(true)}
                    onMouseLeave={() => setJobsDropdownOpen(false)}
                  >
                    <div style={{ display: 'flex', padding: '16px' }}>
                      {/* Job Types */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontWeight: 600, 
                          color: '#374151',
                          marginBottom: '12px',
                          paddingLeft: '16px'
                        }}>
                          Job Types
                        </h4>
                        {jobCategories.map((job, index) => (
                          <div key={index} style={{ padding: '8px 16px' }}>
                            <a 
                              href="/jobs" 
                              style={{
                                color: '#1f2937',
                                textDecoration: 'none',
                                fontSize: '15px',
                                transition: 'all 0.1s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#2563eb';
                                e.currentTarget.style.fontWeight = 500;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#1f2937';
                                e.currentTarget.style.fontWeight = 'normal';
                              }}
                            >
                              {job}
                            </a>
                          </div>
                        ))}
                      </div>
                      
                      {/* Divider */}
                      <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 16px' }}></div>
                      
                      {/* Job Filters */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontWeight: 600, 
                          color: '#374151',
                          marginBottom: '12px',
                          paddingLeft: '16px'
                        }}>
                          Browse Jobs By
                        </h4>
                        {jobFilters.map((filter, index) => (
                          <div key={index} style={{ padding: '8px 16px' }}>
                            <button 
                              style={{
                                color: '#1f2937',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '15px',
                                padding: 0,
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#2563eb';
                                e.currentTarget.style.fontWeight = 500;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#1f2937';
                                e.currentTarget.style.fontWeight = 'normal';
                              }}
                            >
                              {filter}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Career Compass Dropdown */}
              <div style={{ position: 'relative' }} ref={careerDropdownRef}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#0b2236',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 0',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={() => {
                    setCareerDropdownOpen(true);
                    setJobsDropdownOpen(false);
                  }}
                  onClick={() => {
                    setCareerDropdownOpen(!careerDropdownOpen);
                    setJobsDropdownOpen(false);
                  }}
                >
                  Career Compass
                  <KeyboardArrowDownIcon style={{ width: '16px', height: '16px' }} />
                </button>
                
                {careerDropdownOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '100%',
                      marginTop: '8px',
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      zIndex: 50,
                      width: '800px'
                    }}
                    onMouseEnter={() => setCareerDropdownOpen(true)}
                    onMouseLeave={() => setCareerDropdownOpen(false)}
                  >
                    <div style={{ display: 'flex', padding: '16px' }}>
                      {/* Career Features */}
                      <div style={{ flex: 1 }}>
                        {careerFeatures.map((item, index) => (
                          <div 
                            key={index} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '12px',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#eff6ff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <div style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#dbeafe',
                              borderRadius: '8px',
                              flexShrink: 0
                            }}></div>
                            <div>
                              <h4 style={{ 
                                fontSize: '16px', 
                                fontWeight: 500, 
                                color: '#1f2937',
                                margin: 0,
                                marginBottom: '2px'
                              }}>
                                {item.title}
                              </h4>
                              <p style={{ 
                                fontSize: '14px', 
                                color: '#6b7280',
                                margin: 0
                              }}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Divider */}
                      <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 16px' }}></div>
                      
                      {/* Promotional Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ backgroundColor: '#ffffff', padding: '16px' }}>
                          <div style={{
                            width: '100%',
                            height: '128px',
                            borderRadius: '8px',
                            background: 'linear-gradient(to right, #dbeafe, #e0e7ff)',
                            marginBottom: '16px'
                          }}></div>
                          <p style={{ 
                            color: '#374151',
                            marginBottom: '16px',
                            fontSize: '14px'
                          }}>
                            Level up your resume: Watch our career compass video guide.
                          </p>
                          <button style={{
                            color: '#2563eb',
                            fontWeight: 500,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#1e40af';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#2563eb';
                          }}
                          >
                            Watch video →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Simple Menu Items */}
              <Link 
                to="/blog" 
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#0b2236',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0b2236'}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#0b2236',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0b2236'}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!token ? (
              <>
                <button
                  onClick={() => window.open("/employer", "_blank")}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: '1px solid rgba(27, 87, 229, 0.2)',
                    background: 'rgba(27, 87, 229, 0.06)',
                    color: '#174ea6',
                    minWidth: '140px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(27, 87, 229, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(27, 87, 229, 0.06)';
                  }}
                >
                  Employer Login
                </button>
                <button
                  onClick={() => window.open("/employee", "_self")}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: '#1e63d6',
                    color: '#ffffff',
                    minWidth: '90px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1856b8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e63d6';
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link 
                  to={userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard'}
                  style={{
                    color: '#374151',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{
                    color: '#dc2626',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div style={{ display: isMobile ? 'block' : 'none' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          padding: '0 16px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon style={{ width: '24px', height: '24px', color: '#0b2236' }} />
            </button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img
                src="/logo.png"
                alt="logo"
                style={{ width: 48, height: 'auto', display: 'block', borderRadius: '8px' }}
              />
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!token ? (
              <>
                <a
                  href="https://employer.jobchaahiye.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    color: '#1e63d6',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Employer Login
                </a>
                <Link
                  to="/login/employee"
                  style={{
                    padding: '6px 16px',
                    fontSize: '14px',
                    borderRadius: '4px',
                    color: '#ffffff',
                    backgroundColor: '#1e63d6',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Login
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link 
                  to={userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard'}
                  style={{
                    fontSize: '14px',
                    color: '#374151',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{
                    fontSize: '14px',
                    color: '#dc2626',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50
          }}>
            {/* Backdrop */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Menu Panel */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '256px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="/logo.png"
                    alt="logo"
                    style={{ width: 40, height: 'auto', display: 'block', borderRadius: '8px' }}
                  />
                </Link>
                <button 
                  style={{
                    padding: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CloseIcon style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
              
              {/* Menu Content */}
              <div style={{
                padding: '16px',
                overflowY: 'auto',
                height: 'calc(100vh - 80px)'
              }}>
                {/* Jobs Section */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <span style={{ fontWeight: 500, color: '#1f2937' }}>Jobs</span>
                    <KeyboardArrowDownIcon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div style={{ paddingLeft: '16px', marginTop: '8px' }}>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      Jobs By Type
                    </div>
                    {jobCategories.map((job, index) => (
                      <div key={index} style={{ 
                        padding: '6px 0',
                        color: '#374151',
                        fontSize: '14px'
                      }}>
                        {job}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Career Compass */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <span style={{ fontWeight: 500, color: '#1f2937' }}>Career Compass</span>
                    <KeyboardArrowDownIcon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div style={{ paddingLeft: '32px', marginTop: '8px' }}>
                    {["Resume Builder", "Cover Letter", "Resume Checker", "Blogs"].map((item, index) => (
                      <div key={index} style={{ 
                        padding: '8px 0',
                        color: '#374151'
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Other Menu Items */}
                {mobileMenuItems.map((item, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      padding: '12px 0',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#1f2937',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </div>
                ))}
                
                {/* Login Options */}
                <div style={{ marginTop: '32px' }}>
                  <div style={{ 
                    fontWeight: 500, 
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    Login Options
                  </div>
                  {!token ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button
                        onClick={() => {
                          window.location.href = "/employee";
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(27, 87, 229, 0.2)',
                          backgroundColor: 'rgba(27, 87, 229, 0.06)',
                          color: '#174ea6',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        Candidate Login
                      </button>
                      <button
                        onClick={() => {
                          window.open("/employer", "_blank");
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          backgroundColor: '#1e63d6',
                          color: '#ffffff',
                          fontWeight: 500,
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Employer Login
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <Link
                        to={userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard'}
                        style={{
                          display: 'block',
                          padding: '10px',
                          textAlign: 'center',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          color: '#374151',
                          fontWeight: 500,
                          textDecoration: 'none'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #fecaca',
                          color: '#dc2626',
                          fontWeight: 500,
                          background: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
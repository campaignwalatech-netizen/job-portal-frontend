import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Chip,
  IconButton,
  Avatar,
  Rating,
  Divider,
} from "@mui/material";
import {
  Work,
  Person,
  TrendingUp,
  Bookmark,
  Search,
  Schedule,
  LocationOn,
  Business,
  AccessTime,
  BookmarkBorder,
  Share,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if profile is complete
  const isProfileComplete = localStorage.getItem("profileComplete");

  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "2-4 years",
      posted: "2 days ago",
      urgent: true,
      companyLogo: "/static/images/avatar/1.jpg",
      skills: ["React", "JavaScript", "CSS"],
      category: "Engineering",
      department: "Technology",
      rating: 4.2,
      views: 124,
      applications: 23,
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Remote",
      salary: "₹6-10 LPA",
      experience: "1-3 years",
      posted: "1 day ago",
      urgent: false,
      companyLogo: "/static/images/avatar/2.jpg",
      skills: ["Figma", "UI/UX", "Prototyping"],
      category: "Design",
      department: "Creative",
      rating: 4.5,
      views: 89,
      applications: 15,
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Startup XYZ",
      location: "Mumbai",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "3-5 years",
      posted: "3 days ago",
      urgent: true,
      companyLogo: "/static/images/avatar/3.jpg",
      skills: ["Product Strategy", "Agile", "Analytics"],
      category: "Product",
      department: "Management",
      rating: 4.1,
      views: 156,
      applications: 31,
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Cloud Solutions",
      location: "Hyderabad",
      type: "Full-time",
      salary: "₹10-15 LPA",
      experience: "3-5 years",
      posted: "5 hours ago",
      urgent: true,
      companyLogo: "/static/images/avatar/4.jpg",
      skills: ["Node.js", "Python", "AWS"],
      category: "Engineering",
      department: "Technology",
      rating: 4.3,
      views: 98,
      applications: 18,
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Delhi",
      type: "Full-time",
      salary: "₹15-20 LPA",
      experience: "4-6 years",
      posted: "1 day ago",
      urgent: false,
      companyLogo: "/static/images/avatar/5.jpg",
      skills: ["Python", "ML", "SQL"],
      category: "Data Science",
      department: "Analytics",
      rating: 4.4,
      views: 167,
      applications: 27,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Infra Tech",
      location: "Remote",
      type: "Remote",
      salary: "₹12-16 LPA",
      experience: "3-5 years",
      posted: "2 days ago",
      urgent: false,
      companyLogo: "/static/images/avatar/6.jpg",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      category: "Engineering",
      department: "Operations",
      rating: 4.6,
      views: 134,
      applications: 22,
    },
  ];

  const jobCategories = [
    { name: "Engineering", count: 234, icon: "💻" },
    { name: "Design", count: 156, icon: "🎨" },
    { name: "Product", count: 89, icon: "📊" },
    { name: "Marketing", count: 142, icon: "📱" },
    { name: "Sales", count: 178, icon: "💰" },
    { name: "Data Science", count: 76, icon: "📈" },
    { name: "Operations", count: 98, icon: "⚙️" },
    { name: "HR", count: 67, icon: "👥" },
  ];

  const departments = [
    { name: "Technology", jobs: 324, growth: "+12%" },
    { name: "Creative", jobs: 156, growth: "+8%" },
    { name: "Business", jobs: 278, growth: "+15%" },
    { name: "Operations", jobs: 143, growth: "+5%" },
  ];

  const stats = {
    jobsAvailable: 127,
    savedJobs: 3,
    applications: 5,
    interviews: 2,
  };

  const handleCompleteProfile = () => {
    navigate("/onboarding");
  };

  const handleSearchJobs = () => {
    navigate("/jobs/search");
  };

  const handleApplyJob = (jobId) => {
    if (!isProfileComplete) {
      if (
        window.confirm(
          "Complete your profile to apply for jobs? It only takes 2 minutes!"
        )
      ) {
        navigate("/onboarding");
      }
      return;
    }
    console.log("Applying for job:", jobId);
    alert("Application submitted successfully!");
  };

  const handleSaveJob = (jobId) => {
    console.log("Saving job:", jobId);
    alert("Job saved to your favorites!");
  };

  const handleViewJobDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Welcome message based on profile completion
  const getWelcomeMessage = () => {
    if (isProfileComplete) {
      return "Your profile is complete! Start exploring job opportunities.";
    } else {
      return "Complete your profile to get personalized job recommendations.";
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Work sx={{ fontSize: 40, color: "primary.main" }} />
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Welcome back{user?.name ? `, ${user.name}` : ""}!
                {isProfileComplete && " 🎉"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getWelcomeMessage()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Profile Completion - Only show if profile is NOT complete */}
        {!isProfileComplete && (
          <Paper 
            sx={{ 
              p: 3, 
              mb: 4, 
              background: "linear-gradient(135deg, #C1C3CAFF 0%, #C6C1CBFF 100%)",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Complete Your Profile
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 500 }}>
                  Add your resume, skills, and preferences to get 3x more job matches and 
                  increase your chances of getting hired by top companies.
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    bgcolor: "grey.100",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={handleCompleteProfile}
              >
                Complete Profile
              </Button>
            </Box>
          </Paper>
        )}

        {/* Profile Complete Celebration - Show when profile IS complete */}
        {isProfileComplete && (
          <Paper 
            sx={{ 
              p: 3, 
              mb: 4, 
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  🎉 Profile Complete!
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 500 }}>
                  Your profile is 100% complete! You're now ready to apply for jobs and get 
                  matched with top companies.
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "success.main",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    bgcolor: "grey.100",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/profile")}
              >
                View Profile
              </Button>
            </Box>
          </Paper>
        )}

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { icon: <Work />, value: stats.jobsAvailable, label: "Jobs Available", color: "primary" },
            { icon: <Bookmark />, value: stats.savedJobs, label: "Saved Jobs", color: "secondary" },
            { icon: <Person />, value: stats.applications, label: "Applications", color: "success" },
            { icon: <TrendingUp />, value: stats.interviews, label: "Interviews", color: "warning" },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  "&:hover": { 
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: `${stat.color}.light`,
                      color: `${stat.color}.main`,
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: 700, color: `${stat.color}.main`, mb: 1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Job Categories */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            🔥 Popular Job Categories
          </Typography>
          <Grid container spacing={2}>
            {jobCategories.map((category, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid",
                    borderColor: "grey.200",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => navigate(`/jobs?category=${category.name}`)}
                >
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} jobs
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Departments */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            🏢 Browse by Department
          </Typography>
          <Grid container spacing={2}>
            {departments.map((dept, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={() => navigate(`/jobs?department=${dept.name}`)}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {dept.name}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      {dept.jobs} jobs
                    </Typography>
                    <Chip 
                      label={dept.growth} 
                      size="small" 
                      color="success" 
                      variant="outlined"
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Recommended Jobs */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                💼 Recommended For You
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {isProfileComplete 
                  ? "Jobs tailored to your skills and preferences" 
                  : "Complete your profile to see personalized recommendations"}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              endIcon={<Search />}
              onClick={handleSearchJobs}
              sx={{ 
                fontWeight: 600,
                borderRadius: 2,
                px: 3
              }}
            >
              View All Jobs
            </Button>
          </Box>

          <Grid container spacing={3}>
            {recommendedJobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: job.urgent ? "error.main" : "grey.200",
                    position: "relative",
                    "&:hover": {
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {job.urgent && (
                    <Chip
                      label="Urgent Hiring"
                      color="error"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontWeight: 600,
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                      <Avatar
                        src={job.companyLogo}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      >
                        <Business />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ 
                            fontWeight: 700, 
                            color: "primary.main",
                            lineHeight: 1.2,
                            mb: 0.5
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {job.company}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Rating value={job.rating} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary">
                            ({job.rating})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Job Details */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <LocationOn sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2">{job.location}</Typography>
                        <Chip
                          label={job.type}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ height: 24 }}
                        />
                      </Box>
                      
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <AccessTime sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2">{job.experience}</Typography>
                      </Box>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            variant="outlined"
                            sx={{ height: 24, fontSize: '0.7rem' }}
                          />
                        ))}
                        {job.skills.length > 3 && (
                          <Chip
                            label={`+${job.skills.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{ height: 24, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Footer */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "success.main" }}>
                          {job.salary}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <Visibility sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                          {job.views} views • {job.applications} applications
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleSaveJob(job.id)}
                          sx={{ 
                            border: "1px solid",
                            borderColor: "grey.300"
                          }}
                        >
                          <BookmarkBorder />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ 
                            border: "1px solid",
                            borderColor: "grey.300"
                          }}
                        >
                          <Share />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleApplyJob(job.id)}
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: 2,
                          py: 1
                        }}
                      >
                        Apply Now
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleViewJobDetails(job.id)}
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: 2,
                          py: 1
                        }}
                      >
                        View Details
                      </Button>
                    </Box>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 0.5,
                        mt: 1 
                      }}
                    >
                      <Schedule sx={{ fontSize: 14 }} /> 
                      Posted {job.posted}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions */}
        <Paper
          sx={{ 
            p: 3, 
            mt: 4, 
            borderRadius: 3,
            background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            ⚡ Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {[
              { icon: <Person />, label: "Update Profile", onClick: () => navigate("/profile") },
              { icon: <Search />, label: "Search Jobs", onClick: handleSearchJobs },
              { icon: <Bookmark />, label: "Saved Jobs", onClick: () => navigate("/jobs/saved") },
              { icon: <TrendingUp />, label: "My Applications", onClick: () => navigate("/applications") },
            ].map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={action.icon}
                  onClick={action.onClick}
                  sx={{ 
                    py: 2, 
                    fontWeight: 600,
                    borderRadius: 2,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  {action.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Recent Activity */}
        <Paper
          sx={{ 
            p: 3, 
            mt: 3, 
            borderRadius: 3,
            border: "1px solid",
            borderColor: "grey.200"
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            📈 Recent Activity
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { 
                type: "success", 
                text: "Application sent to Tech Corp for Frontend Developer",
                time: "2 hours ago" 
              },
              { 
                type: "info", 
                text: "Profile viewed by Design Studio",
                time: "1 day ago" 
              },
              { 
                type: "warning", 
                text: "Interview scheduled with Startup XYZ",
                time: "2 days ago" 
              },
            ].map((activity, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: `${activity.type}.main`,
                  }}
                />
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {activity.text}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ minWidth: 80, textAlign: 'right' }}
                >
                  {activity.time}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default JobSeekerDashboard;
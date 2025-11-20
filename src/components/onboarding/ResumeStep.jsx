import { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  LinearProgress
} from '@mui/material';
import { Upload, Description, CheckCircle } from '@mui/icons-material';

const ResumeStep = ({ onNext, onBack }) => {
  const { onboardingData, setResume } = useOnboarding();
  const { resume } = onboardingData;

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF or Word document');
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setUploading(true);
      
      // Simulate upload process
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setResume(file);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Upload Your Resume
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Upload your resume to help employers discover you. We support PDF and Word documents (max 5MB).
      </Alert>

      {!resume ? (
        <Card sx={{ textAlign: 'center', p: 4, border: '2px dashed', borderColor: 'grey.300' }}>
          <Description sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Upload Your Resume
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Drag & drop your resume here or click to browse
          </Typography>

          <Button
            variant="contained"
            component="label"
            startIcon={<Upload />}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose File'}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
          </Button>

          {uploading && (
            <Box sx={{ mt: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress} 
                sx={{ mb: 1 }}
              />
              <Typography variant="caption">
                Uploading... {uploadProgress}%
              </Typography>
            </Box>
          )}
        </Card>
      ) : (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CheckCircle color="success" sx={{ fontSize: 40 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Resume Uploaded Successfully!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {resume.name} • {(resume.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload />}
            >
              Replace
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
        </Card>
      )}

      {/* Resume Tips */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Resume Tips
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>Keep your resume updated with recent experience</li>
          <li>Include relevant keywords from job descriptions</li>
          <li>Highlight your achievements and impact</li>
          <li>Keep it concise (1-2 pages recommended)</li>
          <li>Use a clean, professional format</li>
        </Typography>
      </Card>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained" disabled={!resume}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeStep;
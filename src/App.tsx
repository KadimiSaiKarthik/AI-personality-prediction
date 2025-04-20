import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { extractTextFromPdf } from './utils/pdfUtils';
import { sentimentAnalyzer } from './utils/sentimentAnalysis';
import { EnhancedCandidateScoringModel } from './utils/candidateScoring';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

interface Candidate {
  id: string;
  name: string;
  fileName: string;
  role: string;
  score: number;
  sentiment: string;
  confidence: number;
  personalityTraits: string[];
  recommendedRoles: string[];
}

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const model = new EnhancedCandidateScoringModel();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file');
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert('File is too large. Please upload a PDF smaller than 10MB.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Processing PDF:', file.name);
      const text = await extractTextFromPdf(file);
      
      if (!text || text.trim().length === 0) {
        throw new Error('No text could be extracted from the PDF. Please ensure the file contains readable text.');
      }

      console.log('Successfully extracted text, length:', text.length);
      const features = model.extractFeatures(text);
      const { suitabilityScore, recommendedRoles } = model.predictSuitability(features);
      const sentimentResults = sentimentAnalyzer.analyze(text);

      const newCandidate: Candidate = {
        id: Date.now().toString(),
        name: file.name.replace('.pdf', ''),
        fileName: file.name,
        role: recommendedRoles[0] || 'Unknown',
        score: suitabilityScore,
        sentiment: sentimentResults.sentiment,
        confidence: sentimentResults.confidence,
        personalityTraits: sentimentResults.personalityTraits,
        recommendedRoles
      };

      setCandidates(prev => [...prev, newCandidate]);
      setSelectedCandidate(newCandidate);
    } catch (error) {
      console.error('Error processing PDF:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to process the PDF. Please ensure the file is a valid text-based PDF document.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const filteredCandidates = candidates.filter(candidate =>
    selectedRole === 'All Roles' ? true : candidate.recommendedRoles.includes(selectedRole)
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success.main';
    if (score >= 60) return 'info.main';
    if (score >= 40) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          AI Peronality prediction using ML & Sentiment Analysis 🧠 📊
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          Revolutionizing talent acquisition through AI-powered analysis
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Upload Candidate CV
              </Typography>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="cv-upload"
              />
              <label htmlFor="cv-upload">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Choose File
                </Button>
              </label>

              <FormControl fullWidth>
                <InputLabel>Filter Job Roles</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  label="Filter Job Roles"
                >
                  <MenuItem value="All Roles">All Roles</MenuItem>
                  <MenuItem value="Senior Software Engineer">Senior Software Engineer</MenuItem>
                  <MenuItem value="Technical Lead">Technical Lead</MenuItem>
                  <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                  <MenuItem value="Team Lead">Team Lead</MenuItem>
                  <MenuItem value="Junior Software Engineer">Junior Software Engineer</MenuItem>
                </Select>
              </FormControl>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Candidate Pipeline
              </Typography>
              <List>
                {filteredCandidates.map((candidate) => (
                  <ListItem
                    key={candidate.id}
                    button
                    onClick={() => setSelectedCandidate(candidate)}
                    sx={{
                      bgcolor: selectedCandidate?.id === candidate.id ? 'action.selected' : 'background.paper',
                      mb: 1,
                      borderRadius: 1
                    }}
                  >
                    <ListItemText
                      primary={candidate.name}
                      secondary={candidate.role}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: getScoreColor(candidate.score),
                        fontWeight: 'bold'
                      }}
                    >
                      {candidate.score}%
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Analysis Results
              </Typography>
              {selectedCandidate ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    {selectedCandidate.name}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Recommended Roles:
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {selectedCandidate.recommendedRoles.map((role, index) => (
                        <Chip
                          key={index}
                          label={role}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Typography variant="body2" gutterBottom>
                    <strong>Suitability Score:</strong>{' '}
                    <Box
                      component="span"
                      sx={{ color: getScoreColor(selectedCandidate.score) }}
                    >
                      {selectedCandidate.score}%
                    </Box>
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    <strong>Sentiment Analysis:</strong>{' '}
                    <Box
                      component="span"
                      sx={{
                        color: selectedCandidate.sentiment === 'Positive' ? 'success.main' :
                               selectedCandidate.sentiment === 'Neutral' ? 'warning.main' : 'error.main'
                      }}
                    >
                      {selectedCandidate.sentiment}
                    </Box>
                    {' '}(Confidence: {selectedCandidate.confidence}%)
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Personality Traits:
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {selectedCandidate.personalityTraits.map((trait, index) => (
                        <Chip
                          key={index}
                          label={trait}
                          color="secondary"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                </>
              ) : (
                <Typography color="textSecondary">
                  Select a candidate to view analysis
                </Typography>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>

      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default App; 
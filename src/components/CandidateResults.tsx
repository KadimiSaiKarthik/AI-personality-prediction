import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  styled
} from '@mui/material';
import { Candidate } from '../types/candidate';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '1rem',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const ScoreBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: '0.5rem',
}));

interface CandidateResultsProps {
  candidates: Candidate[];
}

const CandidateResults: React.FC<CandidateResultsProps> = ({ candidates }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'info';
    if (score >= 0.4) return 'warning';
    return 'error';
  };

  return (
    <Box>
      {candidates.map((candidate, index) => (
        <StyledCard key={index}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {candidate.fileName}
            </Typography>
            
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Recommended Roles:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                {candidate.recommendedRoles.map((role, idx) => (
                  <Chip
                    key={idx}
                    label={role}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Overall Suitability Score:
              </Typography>
              <ScoreBar
                variant="determinate"
                value={candidate.suitabilityScore * 100}
                color={getScoreColor(candidate.suitabilityScore) as any}
              />
              <Typography variant="body2" align="right">
                {(candidate.suitabilityScore * 100).toFixed(1)}%
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Key Insights:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {candidate.analysis.insights}
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </Box>
  );
};

export default CandidateResults; 
"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  DeleteOutline as DeleteIcon,
  LocationOn as LocationIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Student } from "@/types/student";

interface Props {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onGet: () => void;
}

export default function StudentCard({
  student,
  onEdit,
  onDelete,
  onGet,
}: Props) {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        borderRadius: "20px", 
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(0,0,0,0.03)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
        }
      }}
    >
      {/* Badge for Standard */}
      <Chip 
        label={`Grade ${student.standard}`} 
        size="small"
        sx={{ 
          position: "absolute", 
          top: 15, 
          right: 15, 
          zIndex: 1, 
          bgcolor: "rgba(255,255,255,0.9)", 
          backdropFilter: "blur(4px)",
          fontWeight: "bold",
          color: "primary.main"
        }} 
      />

      <CardMedia
        component="img"
        height="200"
        image={student.image || "/default.jpg"}
        alt={student.name}
        sx={{ 
          objectFit: "cover",
          transition: "transform 0.5s",
          "&:hover": { transform: "scale(1.05)" }
        }}
      />

      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Typography variant="h6" fontWeight="800" sx={{ color: "#1e293b", mb: 0.5 }}>
          {student.name}
        </Typography>
        
        <Stack direction="row" alignItems="center" gap={0.5} sx={{ color: "text.secondary", mb: 2 }}>
          <LocationIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" noWrap>
            {student.address || "No address provided"}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Stack direction="row" spacing={1}>
            <Tooltip title="View Details">
              <IconButton 
                size="small" 
                onClick={onGet}
                sx={{ bgcolor: "#eff6ff", color: "#2563eb", "&:hover": { bgcolor: "#dbeafe" } }}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Edit Profile">
              <IconButton 
                size="small" 
                onClick={onEdit}
                sx={{ bgcolor: "#fff7ed", color: "#ea580c", "&:hover": { bgcolor: "#ffedd5" } }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Tooltip title="Remove Student">
            <IconButton 
              size="small" 
              onClick={onDelete}
              sx={{ color: "#ef4444", "&:hover": { bgcolor: "#fee2e2" } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}
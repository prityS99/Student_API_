"use client";

import { useEffect, useState } from "react";
import { 
  Grid, Container, Typography, Dialog, Button, Box, 
  Avatar, IconButton, Tooltip, Fade, Paper 
} from "@mui/material";
import { 
  Add as AddIcon, 
  Logout as LogoutIcon, 
  School as SchoolIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { Student } from "@/types/student";
import { 
  getStudents, createStudent, updateStudent, deleteStudent 
} from "@/services/studentService";
import StudentCard from "@/compo/StudentCard";
import StudentForm from "@/compo/StudentForm";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const router = useRouter();

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchStudents();
    }
  }, [router]);

  const handleAdd = async (data: FormData) => {
    try {
      await createStudent(data);
      await fetchStudents();
      setOpen(false);
    } catch (err) { alert("Failed to add"); }
  };

  const handleUpdate = async (data: FormData) => {
    if (!editStudent?._id) return;
    try {
      await updateStudent(editStudent._id, data);
      await fetchStudents();
      setOpen(false);
      setEditStudent(null);
    } catch (err) { alert("Failed to update"); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Permanently remove this student?")) {
      try {
        await deleteStudent(id);
        await fetchStudents();
      } catch (err) { alert("Delete failed"); }
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#f8fafc", // Soft off-white/blue background
      pb: 10 
    }}>
      {/* --- TOP MODERN NAV BAR --- */}
      <Box sx={{ 
        bgcolor: "white", 
        px: { xs: 2, md: 6 }, 
        py: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
            <SchoolIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="800" letterSpacing="-0.5px">
            Edu<span style={{ color: "#1976d2" }}>Stream</span>
          </Typography>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => { setEditStudent(null); setOpen(true); }}
            sx={{ 
              borderRadius: "12px", 
              textTransform: "none", 
              px: 3,
              fontWeight: 600,
              boxShadow: "0 4px 14px 0 rgba(25, 118, 210, 0.39)"
            }}
          >
            Add Student
          </Button>
          <Tooltip title="Logout">
            <IconButton onClick={() => { localStorage.removeItem("token"); router.push("/login"); }} sx={{ color: "error.main" }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* --- HEADER SECTION --- */}
        <Box mb={5}>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#1e293b" }}>
            Student Records
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b" }}>
            Manage and monitor student enrollments in real-time.
          </Typography>
        </Box>

        {/* --- GRID LIST --- */}
        <Grid container spacing={4}>
          {students.length > 0 ? (
            students.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student._id}>
                <Fade in timeout={500}>
                  <Box sx={{ 
                    transition: "transform 0.2s", 
                    "&:hover": { transform: "translateY(-8px)" } 
                  }}>
                    <StudentCard
                      student={student}
                      onGet={() => alert(`Address: ${student.address}`)}
                      onEdit={() => { setEditStudent(student); setOpen(true); }}
                      onDelete={() => handleDelete(student._id!)}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: "100%", textAlign: "center", mt: 10 }}>
               <Typography variant="h6" color="textSecondary">No students enrolled yet.</Typography>
            </Box>
          )}
        </Grid>
      </Container>

      {/* --- FORM DIALOG --- */}
      <Dialog 
        open={open} 
        onClose={() => { setOpen(false); setEditStudent(null); }}
        PaperProps={{
          sx: { borderRadius: "24px", p: 1, maxWidth: "500px", width: "100%" }
        }}
      >
        <StudentForm
          initialData={editStudent || undefined}
          onSubmit={editStudent ? handleUpdate : handleAdd}
        />
      </Dialog>
    </Box>
  );
}
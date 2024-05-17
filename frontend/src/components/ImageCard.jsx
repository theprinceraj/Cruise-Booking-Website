import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ImageCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="400"
                    image="/image1.jpg"
                    alt="Promotional Card Image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Relax in your elegant floating retreat.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

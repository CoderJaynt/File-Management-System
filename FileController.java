import org.springframework.web.bind.annotation.RestController; import org.springframework.web.bind.annotation.RequestMapping; import org.springframework.web.bind.annotation.PostMapping; import org.springframework.web.bind.annotation.RequestParam; import org.springframework.http.ResponseEntity; import org.springframework.http.HttpStatus; import org.springframework.web.multipart.MultipartFile; import java.nio.file.Path; import java.nio.file.Paths; import java.nio.file.Files; import java.nio.file.StandardCopyOption; import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.ok("File uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }
}

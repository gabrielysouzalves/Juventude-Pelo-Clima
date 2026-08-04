package jpc.controller;

import jpc.dto.CadastroRequest;
import jpc.dto.LoginRequest;
import jpc.model.TipoUsuario;
import jpc.model.Usuario;
import jpc.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/teste")
    public String teste() {
        return "Backend funcionando!";
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroRequest request) {

        if (request.getNome() == null || request.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O nome é obrigatório.");
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O email é obrigatório.");
        }

        if (request.getTelefone() == null || request.getTelefone().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O telefone é obrigatório.");
        }

        if (request.getSenha() == null || request.getSenha().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("A senha é obrigatória.");
        }

        String email = request.getEmail().trim();
        String telefone = request.getTelefone().trim();

        if (usuarioRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Este email já está sendo utilizado.");
        }

        if (usuarioRepository.existsByTelefone(telefone)) {
            return ResponseEntity.badRequest().body("Este telefone já está sendo utilizado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome().trim());
        usuario.setEmail(email);
        usuario.setTelefone(telefone);
        usuario.setSenha(request.getSenha().trim());
        usuario.setTipoUsuario(TipoUsuario.VOLUNTARIO);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Cadastro realizado com sucesso.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(request.getEmail());

        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Email ou senha inválidos.");
        }

        Usuario usuario = usuarioOptional.get();

        if (!usuario.getSenha().equals(request.getSenha())) {
            return ResponseEntity.status(401).body("Email ou senha inválidos.");
        }

        return ResponseEntity.ok(usuario);
    }
}
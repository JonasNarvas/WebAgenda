using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAgenda.Data;
using WebAgenda.DTOs;
using WebAgenda.Models;

namespace WebAgenda.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContatoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ContatoController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContatoReadDTO>>> GetContatos()
        {
            var contatos = await _context.Contatos.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ContatoReadDTO>>(contatos));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContatoReadDTO>> GetContato(int id)
        {
            var contato = await _context.Contatos.FindAsync(id);
            if (contato == null) return NotFound();

            return Ok(_mapper.Map<ContatoReadDTO>(contato));
        }

        [HttpPost]
        public async Task<ActionResult<ContatoReadDTO>> CreateContato([FromBody] ContatoCreateDTO dto)
        {
            var contato = _mapper.Map<Contatos>(dto);
            contato.DataCadastro = DateTime.UtcNow;

            _context.Contatos.Add(contato);
            await _context.SaveChangesAsync();

            var readDto = _mapper.Map<ContatoReadDTO>(contato);

            return CreatedAtAction(nameof(GetContato), new { id = contato.Id }, readDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContato(int id, [FromBody] ContatoUpdateDTO dto)
        {
            if (id != dto.Id) return BadRequest();

            var contato = await _context.Contatos.FindAsync(id);
            if (contato == null) return NotFound();

            _mapper.Map(dto, contato);
            contato.DataUltimaAlteracao = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContato([FromBody] ContatoDeleteDTO dto)
        {
            var contato = await _context.Contatos.FindAsync(dto.Id);
            if (contato == null) return NotFound();

            _context.Contatos.Remove(contato);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;
using Microsoft.Data.SqlClient;

namespace StudentApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _db = context;

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAll()
            => await _db.Students.AsNoTracking().ToListAsync();

        // GET: api/Students/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>> Get(int id)
        {
            var student = await _db.Students.FindAsync(id);
            return student is null ? NotFound() : student;
        }

        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult<Student>> Create(Student student)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            if (!string.IsNullOrWhiteSpace(student.Email))
                student.Email = student.Email.Trim().ToLowerInvariant();


            bool emailExists = await _db.Students
                    .AnyAsync(s => s.Email == student.Email);

            if (emailExists)
                return BadRequest("Email already exists.");

            _db.Students.Add(student);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = student.Id }, student);


        }

        // PUT: api/Students/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, Student student)
        {
            if (id != student.Id) return BadRequest("Id mismatch");
            if (!await _db.Students.AnyAsync(s => s.Id == id)) return NotFound();

            _db.Entry(student).State = EntityState.Modified;  
            bool emailExists = await _db.Students
                     .AnyAsync(s => s.Email == student.Email);

            if (emailExists)
                return BadRequest("Email already exists.");

            await _db.SaveChangesAsync();
           
            return NoContent();
        }

        // DELETE: api/Students/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _db.Students.FindAsync(id);
            if (student is null) return NotFound();

            _db.Students.Remove(student);
            await _db.SaveChangesAsync();
            return NoContent();
        }



    }
}

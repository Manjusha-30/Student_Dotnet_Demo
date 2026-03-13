
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace StudentApi.Models
{ 
    public class Student
    {

        public int Id { get; set; } // PK

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [Range(1, 120)]
        public int Age { get; set; }
    }
}

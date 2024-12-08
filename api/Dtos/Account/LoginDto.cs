using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        [JsonPropertyName("username")]  // 명시 안할시 Json 데이터로 보낸 key값은 c#으로 넘어올때 자동으로 카멜케이스로 변경되어 매칭됨
        public string UserName { get; set; }    
        [Required]
            [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
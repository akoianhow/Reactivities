using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

namespace Application.Core
{

    public class AppException
    {
        public AppException(int statusCode, string message, string? details)
        {
        }
        public int StatusCode { get; set; }
        public string Message { get; set; } = "";
        public string Details { get; set; } = "";
    }
}




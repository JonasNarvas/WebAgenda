using AutoMapper;
using WebAgenda.DTOs;
using WebAgenda.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebAgenda.Profiles
{
    public class ContatoProfile : Profile
    {
        public ContatoProfile()
        {
            CreateMap<Contatos, ContatoReadDTO>();
            CreateMap<ContatoCreateDTO, Contatos>();
            CreateMap<ContatoUpdateDTO, Contatos>();
            CreateMap<Contatos, ContatoUpdateDTO>();
            CreateMap<ContatoDeleteDTO, Contatos>();
        }
    }
}

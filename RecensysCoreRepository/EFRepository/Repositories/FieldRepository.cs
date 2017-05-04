using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;
using Remotion.Linq.Clauses;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class FieldRepository: IFieldRepository
    {
        private readonly RecensysContext _context;

        public FieldRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public IEnumerable<FieldDTO> GetAll(int studyId)
        {
            return from f in _context.Fields
                where f.StudyId == studyId
                select new FieldDTO
                {
                    Id = f.Id,
                    Name = f.Name,
                    DataType = f.DataType
                };
        }

        public bool Update(int studyId, FieldDTO[] dtos)
        {
            var stored = (from f in _context.Fields
                where f.StudyId == studyId
                select f).ToList();
            
            // remove entries in store that are not passed in dto
            foreach (var re in stored)
                if (dtos.All(d => d.Id == re.Id)) _context.Fields.Remove(re);

            // map data
            foreach (var dto in dtos)
            {
                if (dto.Id == 0)
                {
                    var f = new Field {Name = dto.Name, DataType = dto.DataType, StudyId = studyId };
                    _context.Fields.Add(f);
                }
                if (dto.Id > 0)
                {
                    var storedF = stored.Single(sf => sf.Id == dto.Id);
                    storedF.Name = dto.Name;
                    storedF.DataType = dto.DataType;
                }
            }
            return _context.SaveChanges() > 0;
        }
        
    }
}

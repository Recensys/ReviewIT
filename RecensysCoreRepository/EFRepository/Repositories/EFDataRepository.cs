using System;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class EFDataRepository: IDataRepository
    {
        private readonly RecensysContext _context;

        public EFDataRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public DataDTO Read(int id)
        {
            return (from d in _context.Data
                where d.Id == id
                select new DataDTO
                {
                    Id = d.Id,
                    Value = d.Value
                }).Single();
        }

        public DataDTO Read(int articleId, int fieldId)
        {
            return (from d in _context.Data
                where d.ArticleId == articleId && d.FieldId == fieldId
                select new DataDTO
                {
                    Id = d.Id,
                    Value = d.Value
                }).Single();
        }
    }
}
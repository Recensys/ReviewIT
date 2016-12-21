using System;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository
{
    public class RepositoryFactory : IRepositoryFactory
    {

        private readonly RecensysContext _context;


        private IStudyDetailsRepository _studyDetailsRepository;
        public IStudyDetailsRepository GetStudyDetailsRepository
            => _studyDetailsRepository ?? (_studyDetailsRepository = new StudyDetailsRepository(_context));

        private IStudySourceRepository _studySourceRepository;
        public IStudySourceRepository GetStudySourceRepository
            => _studySourceRepository ?? (_studySourceRepository = new StudySourceRepository(_context));




        public RepositoryFactory(RecensysContext context)
        {
            _context = context;
        }
        

        public void Dispose()
        {
            _context.Dispose();
        }

        public IRepository<T> GetRepo<T>() where T : class, IEntity
        {
            throw new NotImplementedException();
        }
    }
}

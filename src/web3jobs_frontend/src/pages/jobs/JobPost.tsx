import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const jobPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  type: z.enum(['full-time', 'part-time', 'contract']),
  location: z.string().min(2, 'Location is required'),
  budget: z.object({
    min: z.string().min(1, 'Minimum budget is required'),
    max: z.string().min(1, 'Maximum budget is required'),
  }),
  skills: z.string().min(2, 'At least one skill is required'),
  experience: z.enum(['entry', 'intermediate', 'senior']),
  deadline: z.string().min(1, 'Application deadline is required'),
});

type JobPostForm = z.infer<typeof jobPostSchema>;

export const JobPost = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<JobPostForm>({
    resolver: zodResolver(jobPostSchema),
  });

  const onSubmit = (data: JobPostForm) => {
    console.log('Job post data:', data);
    navigate('/client-dashboard');
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8">Post a New Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-secondary-light p-6 rounded-lg space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Job Title
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                placeholder="e.g., Senior Smart Contract Developer"
                className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-accent-red">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Job Description
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={6}
                placeholder="Describe the job requirements, responsibilities, and qualifications..."
                className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-accent-red">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                  Job Type
                </label>
                <select
                  id="type"
                  {...register('type')}
                  className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-accent-red">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register('location')}
                  placeholder="e.g., Remote, New York, etc."
                  className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-accent-red">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      {...register('budget.min')}
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      {...register('budget.max')}
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                {(errors.budget?.min || errors.budget?.max) && (
                  <p className="mt-1 text-sm text-accent-red">Please specify the budget range</p>
                )}
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                  Experience Level
                </label>
                <select
                  id="experience"
                  {...register('experience')}
                  className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior Level</option>
                </select>
                {errors.experience && (
                  <p className="mt-1 text-sm text-accent-red">{errors.experience.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-1">
                Required Skills
              </label>
              <input
                id="skills"
                type="text"
                {...register('skills')}
                placeholder="e.g., Solidity, React, Web3.js (comma separated)"
                className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.skills && (
                <p className="mt-1 text-sm text-accent-red">{errors.skills.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">
                Application Deadline
              </label>
              <input
                id="deadline"
                type="date"
                {...register('deadline')}
                className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-accent-red">{errors.deadline.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              Post Job
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
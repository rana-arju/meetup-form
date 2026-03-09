'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ReunionFormSchema = z.object({
  fullName: z.string()
    .min(1, 'পূর্ণ নাম আবশ্যক')
    .min(3, 'নাম কমপক্ষে ৩ অক্ষর হতে হবে'),
  rollNumber: z.string().optional().default(''),
  phone: z.string()
    .min(1, 'মোবাইল নম্বর আবশ্যক')
    .regex(/^[\d\s\-\+]+$/, 'শুধুমাত্র সংখ্যা, স্পেস এবং হাইফেন ব্যবহার করুন')
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return /^\d{10,11}$/.test(digits);
    }, 'মোবাইল নম্বর ১০-১১ অঙ্কের হতে হবে'),
  currentLocation: z.string().optional().default(''),
  interest: z.string()
    .min(1, 'আগ্রহের মাত্রা নির্বাচন করুন'),
  suggestions: z.string().optional().default(''),
  wantUpdates: z.boolean().default(true),
});

type ReunionFormInputs = z.infer<typeof ReunionFormSchema>;

export function ReunionForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<ReunionFormInputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ReunionFormInputs>({
    resolver: zodResolver(ReunionFormSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      rollNumber: '',
      phone: '',
      currentLocation: '',
      interest: '',
      suggestions: '',
      wantUpdates: true,
    },
  });

  const interestValue = watch('interest');
  const wantUpdatesValue = watch('wantUpdates');

  const onSubmit = (data: ReunionFormInputs) => {
    console.log('[v0] Form submitted with Zod validation:', data);
    setSuccessData(data);
    setShowSuccess(true);

    setTimeout(() => {
      reset();
      setShowSuccess(false);
      setSuccessData(null);
    }, 4000);
  };

  return (
    <>
      <section id="form" className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-3 sm:mb-4">
              তুমি কি আমাদের সাথে থাকবে?
            </h2>
            <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed">
              যদি তুমি এই গেট-টুগেদারে অংশ নিতে আগ্রহী হও, তাহলে নিচের ফর্মটি পূরণ করে তোমার সম্মতি জানাও।
            </p>
          </div>

          <div ref={formRef} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/10 to-transparent rounded-2xl blur-2xl" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#1E293B]/80 to-[#111827]/80 border border-[#F59E0B]/20 backdrop-blur-sm space-y-5 sm:space-y-6"
            >
              <div>
                <Label htmlFor="fullName" className="text-[#FFF7ED] mb-2 block">
                  পূর্ণ নাম <span className="text-[#EF4444]">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="আপনার পূর্ণ নাম"
                  {...register('fullName')}
                  className={`bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B] ${
                    errors.fullName ? 'border-[#EF4444]' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[#EF4444] text-sm mt-1 font-medium">{errors.fullName.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="rollNumber" className="text-[#FFF7ED] mb-2 block">
                    রোল নম্বর / পরিচিতি
                  </Label>
                  <Input
                    id="rollNumber"
                    placeholder="রোল নম্বর"
                    {...register('rollNumber')}
                    className="bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B]"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#FFF7ED] mb-2 block">
                    মোবাইল নম্বর <span className="text-[#EF4444]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="০১xxxxxxxxx"
                    {...register('phone')}
                    className={`bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B] ${
                      errors.phone ? 'border-[#EF4444]' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[#EF4444] text-sm mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="currentLocation" className="text-[#FFF7ED] mb-2 block">
                  বর্তমানে কোথায় আছো?
                </Label>
                <Input
                  id="currentLocation"
                  placeholder="শহর/বিভাগ"
                  {...register('currentLocation')}
                  className="bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B]"
                />
              </div>

              <div>
                <Label htmlFor="interest" className="text-[#FFF7ED] mb-2 block">
                  তুমি কি যোগ দিতে আগ্রহী? <span className="text-[#EF4444]">*</span>
                </Label>
                <Select value={interestValue} onValueChange={(value) => setValue('interest', value)}>
                  <SelectTrigger className={`bg-[#0F172A] border-[#334155] text-[#FFF7ED] ${
                    errors.interest ? 'border-[#EF4444]' : ''
                  }`}>
                    <SelectValue placeholder="একটি অপশন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-[#334155]">
                    <SelectItem value="definitely" className="text-[#FFF7ED]">
                      হ্যাঁ, ইনশাআল্লাহ আসবো
                    </SelectItem>
                    <SelectItem value="maybe" className="text-[#FFF7ED]">
                      চেষ্টা করবো
                    </SelectItem>
                    <SelectItem value="unsure" className="text-[#FFF7ED]">
                      এখনো নিশ্চিত না
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.interest && (
                  <p className="text-[#EF4444] text-sm mt-1 font-medium">{errors.interest.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="suggestions" className="text-[#FFF7ED] mb-2 block">
                  তোমার কোনো মতামত / প্রস্তাবনা
                </Label>
                <Textarea
                  id="suggestions"
                  placeholder="কোথায় এবং কখন আয়োজন করা ভালো হবে, তা নিয়ে যদি কোনো পরামর্শ থাকে..."
                  {...register('suggestions')}
                  className="bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B] min-h-24"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="updates"
                  {...register('wantUpdates')}
                  defaultChecked={wantUpdatesValue}
                  className="w-4 h-4 accent-[#F59E0B] cursor-pointer"
                />
                <Label htmlFor="updates" className="text-[#CBD5E1] cursor-pointer">
                  তারিখ ও স্থান চূড়ান্ত করার আপডেট পেতে চাই
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F59E0B] hover:bg-[#DC8502] text-[#0F172A] font-semibold text-base sm:text-lg py-5 sm:py-6 rounded-lg mt-6 sm:mt-8"
              >
                সম্মতি জানাই
              </Button>
            </form>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-br from-[#1E293B]/95 to-[#111827]/95 border border-[#F59E0B]/30 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#CBD5E1] hover:text-[#FFF7ED] transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="text-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/20 rounded-full" />
                <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#F59E0B] relative z-10" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#FFF7ED] mb-2">
                অনেক ভালো লাগলো!
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] mb-4 sm:mb-6">
                তোমার সম্মতি পাওয়া গেছে। ধন্যবাদ আমাদের সাথে থাকার জন্য।
              </p>

              {successData && (
                <div className="bg-[#0F172A]/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left text-xs sm:text-sm space-y-2">
                  <div>
                    <span className="text-[#F59E0B] font-semibold">নাম:</span>
                    <span className="text-[#FFF7ED] ml-2 break-words">{successData.fullName}</span>
                  </div>
                  {successData.phone && (
                    <div>
                      <span className="text-[#F59E0B] font-semibold">ফোন:</span>
                      <span className="text-[#FFF7ED] ml-2">{successData.phone}</span>
                    </div>
                  )}
                  {successData.currentLocation && (
                    <div>
                      <span className="text-[#F59E0B] font-semibold">অবস্থান:</span>
                      <span className="text-[#FFF7ED] ml-2 break-words">{successData.currentLocation}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#F59E0B] font-semibold">আগ্রহ:</span>
                    <span className="text-[#FFF7ED] ml-2">
                      {successData.interest === 'definitely' && 'হ্যাঁ, ইনশাআল্লাহ আসবো'}
                      {successData.interest === 'maybe' && 'চেষ্টা করবো'}
                      {successData.interest === 'unsure' && 'এখনো নিশ্চিত না'}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-[#CBD5E1] text-xs sm:text-sm italic">
                খুব শীঘ্রই চূড়ান্ত আপডেট জানানো হবে, ইনশাআল্লাহ।
              </p>
            </div>

            <div className="absolute top-2 left-4 w-2 h-2 bg-[#F59E0B] rounded-full" />
            <div className="absolute bottom-4 right-6 w-2 h-2 bg-[#EC4899] rounded-full" />
          </div>
        </div>
      )}
    </>
  );
}

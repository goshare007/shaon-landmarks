import {
  IconArrowRight,
  IconCalendarTime,
  IconShield,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  return (
    <section className='mx-auto my-20 max-w-360 px-4 md:px-16'>
      <div className='grid gap-6 md:grid-cols-12'>
        {/* Left copy */}
        <div className='mb-12 md:col-span-5 md:mb-0'>
          <div className='flex items-center gap-4 mb-7'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
              Consultation
            </span>
          </div>
          <h2 className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] text-foreground mb-6'>
            Design Your <span className='italic text-custom/80'>Brief</span>
          </h2>
          <p className='mb-12 text-sm leading-relaxed text-muted-foreground max-w-sm'>
            Provide us with the foundational details of your aspiration. A
            dedicated senior consultant will review your request and reach out
            within 24 business hours.
          </p>
          <div className='w-14 h-px bg-custom/50 mb-8' />
          <div className='space-y-8'>
            <div className='flex items-start gap-4'>
              <IconShield
                className='text-custom shrink-0 mt-0.5'
                size={18}
                aria-hidden='true'
              />
              <div>
                <h4 className='text-[10px] font-medium tracking-[0.2em] text-foreground uppercase'>
                  Privacy Guaranteed
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Your vision is secure within our confidential framework.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <IconCalendarTime
                className='text-custom shrink-0 mt-0.5'
                size={18}
                aria-hidden='true'
              />
              <div>
                <h4 className='text-[10px] font-medium tracking-[0.2em] text-foreground uppercase'>
                  Priority Scheduling
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Global availability for virtual or in-person sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className='relative border border-border bg-surface-raised p-8 md:col-span-7 md:p-10'>
          <div className='absolute top-0 left-0 w-10 h-px bg-custom/40' />
          <div className='absolute top-0 left-0 w-px h-10 bg-custom/40' />
          <div className='absolute bottom-0 right-0 w-10 h-px bg-custom/40' />
          <div className='absolute bottom-0 right-0 w-px h-10 bg-custom/40' />

          <form className='space-y-8'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div className='group space-y-2'>
                <Label
                  htmlFor='name'
                  className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
                >
                  Full Name *
                </Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  required
                  placeholder='Your full name'
                  className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
                />
              </div>
              <div className='group space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
                >
                  Email Address *
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  placeholder='your@email.com'
                  className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
                />
              </div>
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='interest'
                className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
              >
                Project Interest
              </Label>
              <Select defaultValue='Residential Development'>
                <SelectTrigger
                  id='interest'
                  className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground font-light focus:ring-0 focus:border-custom/50 [&>svg]:text-muted-foreground'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className='rounded-sm border border-border bg-surface-raised text-foreground shadow-lg'
                  sideOffset={4}
                >
                  <SelectItem value='Residential Development'>
                    Residential Development
                  </SelectItem>
                  <SelectItem value='Commercial Portfolio'>
                    Commercial Portfolio
                  </SelectItem>
                  <SelectItem value='Sustainable Landmarks'>
                    Sustainable Landmarks
                  </SelectItem>
                  <SelectItem value='Consultancy Services'>
                    Consultancy Services
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='message'
                className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
              >
                Your Message
              </Label>
              <Textarea
                id='message'
                name='message'
                rows={4}
                placeholder='Describe the scale and intent of your project...'
                className='resize-none rounded-sm border border-border bg-transparent p-4 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
              />
            </div>

            <div className='group'>
              <Button
                variant='custom'
                type='submit'
                className='relative w-full overflow-hidden rounded-sm px-12 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase'
              >
                <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10 inline-flex items-center justify-center gap-3'>
                  Submit Request
                  <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

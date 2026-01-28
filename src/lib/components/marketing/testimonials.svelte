<script lang="ts">
  import { charAt, toUpperCase } from 'string-ts';

  import * as Avatar from '$lib/components/ui/avatar';

  const testimonials = [
    {
      name: 'Haekall',
      image: 'https://github.com/0xk4ll.png',
      quote: 'Fantastic way to organize bookmarks. Highly recommended!',
    },
    {
      name: 'Fathul Arifin',
      image: 'https://github.com/ifyyn.png',
      quote:
        'I love the simplicity of Markzen. It allows me to manage all of my bookmarks in a single place.',
    },
  ];
</script>

<section class="container max-w-4xl py-32">
  <div class="mb-16 text-center">
    <h2>Loved by people</h2>
    <p class="text-muted-foreground">What do people think about our product.</p>
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {#each testimonials as testimonial (testimonial.name)}
      <div>
        <div class="rounded-2xl rounded-bl border bg-card/20 px-4 py-3 text-card-foreground">
          <p>{testimonial.quote}</p>
        </div>
        <div class="not-typography mt-4 flex items-center gap-2">
          <Avatar.Root class="size-6">
            <Avatar.Image src={testimonial.image} alt={testimonial.name} />
            <Avatar.Fallback>
              {toUpperCase(charAt(testimonial.name, 0))}
            </Avatar.Fallback>
          </Avatar.Root>
          <p class="text-sm font-medium">{testimonial.name}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

export default async function PrimePage({
  params,
}: {
  params: Promise<{ start: number; end: number }>;
}) {
  const { start, end } = await params;

  const isPrime = (num: number) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return (
    <div>
      <h2>
        Prime Numbers Between {start} and {end}
      </h2>

      {primes.length > 0 ? (
        <p>{primes.join(", ")}</p>
      ) : (
        <p>No prime numbers found.</p>
      )}
    </div>
  );
}

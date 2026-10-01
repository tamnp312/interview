async function testDev() {
  try {
    const res = await fetch('http://localhost:3000/c/html');
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body snippet:', text.slice(0, 1000));
  } catch (e) {
    console.error('Fetch error:', e.message);
  }
}
testDev();

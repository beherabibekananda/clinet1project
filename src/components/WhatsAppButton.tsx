

export const WhatsAppButton = () => {
  const phoneNumber = "919114222044";
  const message = "Hello, I would like to know more about Tiny Triumph Child Development Centre.";

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-16 w-16 items-center justify-center transition-transform hover:scale-110 focus:outline-none"
      aria-label="Chat on WhatsApp"
    >
      <img src="/whatsapp.webp" alt="Chat on WhatsApp" className="h-full w-full object-contain drop-shadow-lg" width="64" height="64" />
    </a>
  );
};

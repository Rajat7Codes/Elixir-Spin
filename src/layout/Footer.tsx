export default function Footer() {
  return (
    <footer className="shadow-sm sticky bottom-0 z-50 bg-primary py-6 border-t text-center text-gray-600 text-sm">
      <p className="text-textprimary">
        © {new Date().getFullYear()} <span className="text-textsecondary font-medium">RoyaleSpin </span>  
        Built for the Clash Royale community ❤️
      </p>
    </footer>
  );
}

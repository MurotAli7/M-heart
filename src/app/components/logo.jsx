"use client";


export default function HeartLogo({ size = 60 }) {
  return (
    <div className="heart-wrapper">
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        className="heart-svg"
      >
        <defs>
          <linearGradient
            id="heartGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="512"
            y2="512"
          >
            <stop offset="0%" stopColor="red" />
            <stop offset="33.3%" stopColor="blue" />
            <stop offset="66.6%" stopColor="red" />

            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 256 256"
              to="360 256 256"
              dur="2s"
              repeatCount="indefinite"
            />a
          </linearGradient>
        </defs>

        <path
          className="heart-path"
          d="
            M256 464
            s-8-6-16-12
            C120 360 48 288 48 192
            48 120 104 64 176 64
            c48 0 80 32 80 32
            s32-32 80-32
            c72 0 128 56 128 128
            0 96-72 168-192 260
            z
          "
          fill="none"
          stroke="url(#heartGradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="heart-text heartbeat-text"
        >
          M
        </text>

      </svg>


    </div>
  );
}

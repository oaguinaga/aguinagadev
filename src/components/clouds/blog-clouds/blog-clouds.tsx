"use client";
import styled from "styled-components";

function BlogClouds() {
  return (
    <Clouds>
      <svg width="5120" height="357" viewBox="0 0 5120 357" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="var(--color-cloud-500)" d="M2970.83 162.311c-80.18 35.471-73.69 108.447-47.7 124.208 26 15.762 93.47 40.054 93.47 40.054h1305s57.5 19.5 57.5-51-94.97-66.296-94.97-66.296 40.27-77.869-52.89-120.793c-93.16-42.924-146.42 13.009-146.42 13.009s-5.54-62.255-95.87-73.305c-90.33-11.05-137.76 48.38-137.76 48.38s-4.64-52.293-92.06-70.127c-87.42-17.834-162.6 40.045-162.6 40.045S3565.05-8.443 3454.48 1.38c-110.56 9.822-137.31 62.814-137.31 62.814s-51.15-37.036-129.29-7.003c-78.15 30.034-77.58 104.275-77.58 104.275s-59.3-34.626-139.47.845zM330 57.505c-98 9-132 69.5-132 69.5l-88 225.5h2094.5v-.5s-11-77-135.5-89-147 17-159.5 16.5-46-34-131-43.5-154.5 29.5-165 27-32-50-134.5-58-142 20-152 17.5-20-41-100.5-65-162.5 5.5-174 0-5.5-59-110.5-100-166.5 11-181 6.5-40.5-40.5-151.5-40-134.5 53-151.5 54-30-29.5-128-20.5z"></path>
        <path fill="var(--color-page-background)" d="M2741.5 299.5c10-1.428 20.5-71 203.5-91.5s216 49 226.5 49 56.5-74 240-49 189 86 199 84.5 49-63.5 226-71 207 63 216 63 71.5-55 243-27.5 181.5 74 195.5 73.5-8.5-102 199-139 247.5 30.5 262 30 85.5-103.5 245-58.5 0 194 0 194H-92s-72-149.5 0-177.5S1 208 12 208s42.5-98.5 250.5-100.5S511 206.5 518 208s97-68 269-34.5 194 134 203 138 88.5-24 256.5-12 186 47.5 192.5 47.5 50.5-66 204.5-65.5 193 51 202 52 68.5-27.5 248-22 215 35.5 226.5 35.5c11.5.001 38-67.142 204-79 166-11.857 207.5 32.929 217.5 31.5z"></path>
      </svg>
    </Clouds>
  );
}

const Clouds = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  isolation: isolate;
  overflow: clip;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    min-width: 320rem;
    transform: translateY(1px);

    @media (max-width: 50rem) {
      --magic-number: calc(-50vw + 25rem);
      height: calc(5rem + 50vw);
      margin-top: -1rem;
      transform: translate(var(--magic-number), 1px);
    }
  }
`;

export default BlogClouds;
